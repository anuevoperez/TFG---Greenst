import { NextFunction, Request, Response, Router } from "express";
import CityService from "../../../contexts/backoffice/City/application/CityService";
import UserRoles from "../../../contexts/backoffice/Shared/UserRoles";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import HttpError from "../../core/HttpError";
import SecurityMiddleware from "../../middlewares/SecurityMiddleware";

export default class CityController implements ExpressController {
  mainRoute: string = "/cities";
  private _router: Router;
  private _cityService: CityService;
  private _securityMiddleware: SecurityMiddleware;

  constructor(
    cityService: CityService,
    securityMiddleware: SecurityMiddleware
  ) {
    this._cityService = cityService;
    this._router = Router();
    this._securityMiddleware = securityMiddleware;
  }
  get router() {
    this._router.post(
      "/",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.ENCARGADO])
        .bind(this._securityMiddleware),
      this.insertCity.bind(this)
    );
    this._router.put(
      "/:id",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.ENCARGADO])
        .bind(this._securityMiddleware),
      this.updateCity.bind(this)
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
  private async insertCity(req: Request, res: Response, next: NextFunction) {
    const { cityName } = req.body;
    try {
      await this._cityService.insertCity({ cityName });
      res.status(HttpCode.HTTP_CREATED).end();
    } catch (err) {
      next(new HttpError(HttpCode.HTTP_BAD_REQUEST, (err as Error).message));
    }
  }
  private async updateCity(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const { cityName } = req.body;
    try {
      await this._cityService.updateCity({ _id: id, cityName });
      res.status(HttpCode.HTTP_CREATED).end();
    } catch (err) {
      next(new HttpError(HttpCode.HTTP_BAD_REQUEST, (err as Error).message));
    }
  }
  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await this._cityService.findAll();
      res.status(HttpCode.HTTP_OK).json(cities);
    } catch (err) {
      next(err);
    }
  }
  private async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const city = await this._cityService.findById(id);
      res.status(HttpCode.HTTP_OK).json(city);
    } catch (err) {
      next(err);
    }
  }
}
