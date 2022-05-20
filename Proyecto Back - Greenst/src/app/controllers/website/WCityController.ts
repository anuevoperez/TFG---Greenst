import { NextFunction, Request, Response, Router } from "express";
import CityService from "../../../contexts/website/City/application/WCityService";
import UserRoles from "../../../contexts/website/Shared/UserRoles";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import SecurityMiddleware from "../../middlewares/SecurityMiddleware";

export default class WCityController implements ExpressController {
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
      const cities = await this._cityService.findAll();
      res.status(HttpCode.HTTP_OK).json(cities);
    } catch (err) {
      next(err);
    }
  }
}
