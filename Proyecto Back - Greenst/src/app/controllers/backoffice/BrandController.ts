import { NextFunction, Router, Request, Response } from "express";
import BrandService from "../../../contexts/backoffice/Brand/application/BrandService";
import Brand from "../../../contexts/backoffice/Brand/domain/Brand";
import UserRoles from "../../../contexts/backoffice/Shared/UserRoles";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import HttpError from "../../core/HttpError";
import SecurityMiddleware from "../../middlewares/SecurityMiddleware";
export default class BrandController implements ExpressController {
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
    this._router.post(
      "/",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.ENCARGADO])
        .bind(this._securityMiddleware),
      this.insertBrand.bind(this)
    );
    this._router.put(
      "/:id",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.ENCARGADO])
        .bind(this._securityMiddleware),
      this.updateBrand.bind(this)
    );
    this._router.get(
      "/",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.ENCARGADO])
        .bind(this._securityMiddleware),
      this.findAll.bind(this)
    );
    this._router.get(
      "/:id",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.ENCARGADO])
        .bind(this._securityMiddleware),
      this.findById.bind(this)
    );
    return this._router;
  }
  private async insertBrand(req: Request, res: Response, next: NextFunction) {
    const { img, brandName } = req.body;
    try {
      await this._brandService.insertBrand({ img, brandName });
      res.status(HttpCode.HTTP_CREATED).end();
    } catch (err) {
      next(new HttpError(HttpCode.HTTP_BAD_REQUEST, (err as Error).message));
    }
  }
  private async updateBrand(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    console.log(id);
    const brand = req.body as Brand;
    try {
      await this._brandService.updateBrand({ _id: id, ...brand });
      res.status(HttpCode.HTTP_OK).end();
    } catch (err) {
      next(new HttpError(HttpCode.HTTP_BAD_REQUEST, (err as Error).message));
    }
  }
  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const brands = await this._brandService.findAll();
      res.status(HttpCode.HTTP_OK).json(brands);
    } catch (err) {
      next(err);
    }
  }
  private async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const brand = await this._brandService.findById(id);
      res.status(HttpCode.HTTP_OK).json(brand);
    } catch (err) {
      next(err);
    }
  }
}
