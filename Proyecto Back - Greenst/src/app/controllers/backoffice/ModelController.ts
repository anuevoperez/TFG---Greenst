import { NextFunction, Request, Response, Router } from "express";
import ModelService from "../../../contexts/backoffice/Model/application/ModelService";
import Model from "../../../contexts/backoffice/Model/domain/Model";
import UserRoles from "../../../contexts/backoffice/Shared/UserRoles";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import HttpError from "../../core/HttpError";
import SecurityMidleware from "../../middlewares/SecurityMiddleware";

export default class ModelController implements ExpressController {
  mainRoute: string = "/models";
  private _router: Router;
  private _modelService: ModelService;
  private _securityMiddleware: SecurityMidleware;
  constructor(
    modelService: ModelService,
    securityMiddleware: SecurityMidleware
  ) {
    this._modelService = modelService;
    this._securityMiddleware = securityMiddleware;
    this._router = Router();
  }
  get router() {
    this._router.post(
      "/",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware.checkRole([UserRoles.ENCARGADO]).bind(this._securityMiddleware),      this.insertModel.bind(this)
    );
    this._router.put(
      "/:id",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware.checkRole([UserRoles.ENCARGADO]).bind(this._securityMiddleware),      this.updateModel.bind(this)
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
  private async insertModel(req: Request, res: Response, next: NextFunction) {
    try {
      const model = req.body as Model;
      await this._modelService.insertModel(model);
      res.status(HttpCode.HTTP_CREATED).end();
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
  private async updateModel(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const model = req.body as Model;
      await this._modelService.updateModel({ ...model, _id: id });
      res.status(HttpCode.HTTP_OK).end();
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { brand_id } = req.query;
      const models = await this._modelService.findAll(
        brand_id as string | undefined
      );
      res.status(HttpCode.HTTP_OK).json(models);
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
  private async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id);
      const model = await this._modelService.findById(id);
      res.status(HttpCode.HTTP_OK).json(model);
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
}
