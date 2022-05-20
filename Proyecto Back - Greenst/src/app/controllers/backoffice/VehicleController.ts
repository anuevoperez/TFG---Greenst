import { NextFunction, Request, Response, Router } from "express";
import UserRoles from "../../../contexts/backoffice/Shared/UserRoles";
import VehicleService from "../../../contexts/backoffice/Vehicle/application/VehicleService";
import Vehicle from "../../../contexts/backoffice/Vehicle/domain/Vehicle";
import VehicleFilters from "../../../contexts/backoffice/Vehicle/domain/VehicleFilters";
import Pagination from "../../../contexts/shared/domain/Pagination";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import SecurityMidleware from "../../middlewares/SecurityMiddleware";

export default class VehicleController implements ExpressController {
  mainRoute: string = "/vehicles";
  private _router: Router;
  private _vehicleService: VehicleService;
  private _securityMiddleware: SecurityMidleware;
  constructor(
    vehicleService: VehicleService,
    securityMiddleware: SecurityMidleware
  ) {
    this._vehicleService = vehicleService;
    this._securityMiddleware = securityMiddleware;
    this._router = Router();
  }

  get router() {
    this._router.post(
      "/",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware.checkRole([UserRoles.ENCARGADO]).bind(this._securityMiddleware),      this.insertVehicle.bind(this)
    );
    this._router.put(
      "/:id",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware.checkRole([UserRoles.ENCARGADO]).bind(this._securityMiddleware),      this.updateVehicle.bind(this)
    );
    this._router.get(
      "/",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware.checkRole([UserRoles.ENCARGADO]).bind(this._securityMiddleware),      this.findAll.bind(this)
    );
    this._router.get(
      "/:id",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware.checkRole([UserRoles.ENCARGADO]).bind(this._securityMiddleware),      this.findById.bind(this)
    );
    return this._router;
  }
  private async insertVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicle = req.body as Vehicle;
      await this._vehicleService.insertVehicle(vehicle);
      res.status(HttpCode.HTTP_CREATED).end();
    } catch (err) {
      next(err);
    }
  }
  private async updateVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const vehicle = req.body as Vehicle;
      await this._vehicleService.updateVehicle({ ...vehicle, _id: id });
      res.status(HttpCode.HTTP_OK).end();
    } catch (err) {
      next(err);
    }
  }
  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = req.query as VehicleFilters;
      const pagination = {
        ...req.query,
        limit: parseInt(req.query.limit as string) || 10,
      } as Pagination;
      console.log(pagination);
      const vehicles = await this._vehicleService.findAll(filters, pagination);
      res.status(HttpCode.HTTP_OK).json(vehicles);
    } catch (err) {
      next(err);
    }
  }
  private async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const vehicle = await this._vehicleService.findById(id);
      res.status(HttpCode.HTTP_OK).json(vehicle);
    } catch (err) {
      next(err);
    }
  }
}
