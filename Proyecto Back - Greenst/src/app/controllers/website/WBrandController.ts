import { NextFunction, Router, Request, Response } from "express";
import BrandService from "../../../contexts/website/Brand/application/WBrandService";
import UserRoles from "../../../contexts/website/Shared/UserRoles";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import SecurityMiddleware from "../../middlewares/SecurityMiddleware";
export default class WBrandController implements ExpressController {
  mainRoute: string = "/brands";
  private _router: Router;
  private _brandService: BrandService;
  private _securityMiddleware: SecurityMiddleware;

  constructor(
    brandService: BrandService,
    securityMiddleware: SecurityMiddleware
  ) {
    this._brandService = brandService;
    this._securityMiddleware = securityMiddleware;
    this._router = Router();
  }
  get router() {
    this._router.get(
      "/",/* 
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.CLIENTE])
        .bind(this._securityMiddleware), */
      this.findAll.bind(this)
    );

    return this._router;
  }

  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const brands = await this._brandService.findAll();
      res.status(HttpCode.HTTP_OK).json(brands);
    } catch (err) {
      next(err);
    }
  }
}
