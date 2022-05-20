import { NextFunction, Request, Response, Router } from "express";
import ExpressController from "../../core/ExpressController";
import HttpError from "../../core/HttpError";
import AuthService from "../../../contexts/auth/Authentication/application/AuthService";
import MailOptions from "../../../contexts/auth/Authentication/domain/MailOptions";
import { HttpCode } from "../../core/HttpCode";
import TokenPayload from "../../../contexts/auth/Authentication/domain/TokenPayload";
import SecurityMidleware from "../../middlewares/SecurityMiddleware";

class AuthController implements ExpressController {
  mainRoute: string = "/auth";
  private _authService: AuthService;
  private _router: Router;
  private _securityMiddleware: SecurityMidleware;
  constructor(authService: AuthService, securityMiddleware: SecurityMidleware) {
    this._authService = authService;
    this._router = Router();
    this._securityMiddleware = securityMiddleware;
  }
  get router() {
    this._router.post("/login", this.login.bind(this));
    this._router.post(
      "/recoverpassword",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this.recoverPassword.bind(this)
    );
    this._router.get(
      "/resetpassword/:token",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this.resetPassword.bind(this)
    );
    this._router.get(
      "/verifytoken/:token",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this.verifyResetToken.bind(this)
    );
    this._router.patch(
      "/updatepassword",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this.updatePassword.bind(this)
    );
    //this._router.post("/register", this.register.bind(this));
    return this._router;
  }
  private async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const result = await this._authService.authUser(email, password);
      res.status(HttpCode.HTTP_OK).json({
        ...result,
        user: {
          ...result.user,
          password: undefined,
          creationDate: undefined,
          __v: undefined,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  private async recoverPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email } = req.body;
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetpassword/`;
    const mailOptions: MailOptions = {
      from: "Carlos Fuentes <c.fvazquez@hotmail.com>",
      subject: "Recover your password",
      text: "Forgot your password? Follow the next link to recover your password: $URL \n  If you didn´t forget your password, please ignore this email",
    };
    try {
      await this._authService.recoverPassword(email, resetURL, mailOptions);
      res.status(HttpCode.HTTP_OK);
    } catch (err) {
      next(err);
    }
  }
  private async verifyResetToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { resetToken } = req.params;
    const user = await this._authService.verifyResetToken(resetToken);
    if (!user) {
      next(
        new HttpError(
          HttpCode.HTTP_BAD_REQUEST,
          "Token is invalid or has expired"
        )
      );
    }
    res.status(HttpCode.HTTP_OK);
  }
  private async resetPassword(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    const { password, passwordConfirm } = req.body;
    try {
      await this._authService.resetPassword(token, password, passwordConfirm);
      res.status(HttpCode.HTTP_CREATED);
    } catch (err) {
      next(err);
    }
  }
  private async updatePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const tokenPayload: TokenPayload = res.locals.tokenPayload as TokenPayload;
    const userId = tokenPayload.id;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    try {
      await this._authService.updatePassword(
        userId,
        currentPassword,
        newPassword,
        confirmNewPassword
      );
    } catch (err) {
      next(err);
    }
  }
}
export default AuthController;
