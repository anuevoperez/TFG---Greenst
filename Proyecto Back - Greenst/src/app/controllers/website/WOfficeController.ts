import { NextFunction, Request, Response, Router } from "express";
import OfficeService from "../../../contexts/website/Office/application/WOfficeService";
import UserRoles from "../../../contexts/website/Shared/UserRoles";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import HttpError from "../../core/HttpError";
import SecurityMidleware from "../../middlewares/SecurityMiddleware";

export default class WOfficeController implements ExpressController {
  mainRoute: string = "/offices";
  private _router: Router;
  private _officeService: OfficeService;
  private _securityMiddleware: SecurityMidleware;
  constructor(
    officeService: OfficeService,
    securityMiddleware: SecurityMidleware
  ) {
    this._officeService = officeService;
    this._securityMiddleware = securityMiddleware;
    this._router = Router();
  }
  get router() {
    this._router.get(
      "/",
/*       this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.CLIENTE])
        .bind(this._securityMiddleware), */
      this.findAll.bind(this)
    );

    return this._router;
  }

  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const offices = await this._officeService.findAll();
      res.status(HttpCode.HTTP_OK).json(offices);
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
}
