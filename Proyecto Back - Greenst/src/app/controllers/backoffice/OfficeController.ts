import { NextFunction, Request, Response, Router } from "express";
import OfficeService from "../../../contexts/backoffice/Office/application/OfficeService";
import Office from "../../../contexts/backoffice/Office/domain/Office";
import UserRoles from "../../../contexts/backoffice/Shared/UserRoles";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import HttpError from "../../core/HttpError";
import SecurityMidleware from "../../middlewares/SecurityMiddleware";

export default class OfficeController implements ExpressController {
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
    this._router.post(
      "/",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware.checkRole([UserRoles.ENCARGADO]).bind(this._securityMiddleware),      this.insertOffice.bind(this)
    );
    this._router.put(
      "/:id",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware.checkRole([UserRoles.ENCARGADO]).bind(this._securityMiddleware),      this.updateOffice.bind(this)
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
  private async insertOffice(req: Request, res: Response, next: NextFunction) {
    try {
      const office = req.body as Office;
      await this._officeService.insertOffice(office);
      res.status(HttpCode.HTTP_OK).end();
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
  private async updateOffice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const office = req.body as Office;
      await this._officeService.updateOffice({ ...office, _id: id });
      res.status(HttpCode.HTTP_OK).end();
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
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
  private async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const office = await this._officeService.findById(id);
      res.status(HttpCode.HTTP_OK).json(office);
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
}
