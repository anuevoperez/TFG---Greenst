import TokenService from "../../contexts/auth/Authentication/application/TokenService";
import { NextFunction, Request, Response } from "express";
import HttpError from "../core/HttpError";
import { HttpCode } from "../core/HttpCode";
import UserRoles from "../../contexts/backoffice/Shared/UserRoles";
export default class SecurityMidleware {
  private _tokenService: TokenService;
  constructor(tokenService: TokenService) {
    this._tokenService = tokenService;
  }
  async authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      res.status(401).json({
        message: "Invalid Token",
      });
      return;
    }
    const tokenPayload = await this._tokenService.verifyToken(token as string);
    if (!tokenPayload) {
      res.status(HttpCode.HTTP_UNAUTHORIZED).json({
        message: "Invalid Token",
      });
      return;
    }
    res.locals.tokenPayload = tokenPayload;
    next();
  }
  checkRole(roles: UserRoles[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const role = res.locals.tokenPayload.role;
      if (roles.indexOf(role as UserRoles) < 0) {
        res.status(HttpCode.HTTP_FORBIDDEN).json({
          message: "Invalid role",
        });
      }
      next();
    };
  }
}
