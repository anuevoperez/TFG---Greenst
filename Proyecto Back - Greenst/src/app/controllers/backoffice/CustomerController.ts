import { NextFunction, Router, Request, Response } from "express";
import CustomerService from "../../../contexts/backoffice/Customer/application/CustomerService";
import Customer from "../../../contexts/backoffice/Customer/domain/Customer";
import CustomerFilters from "../../../contexts/backoffice/Customer/domain/CustomerFilters";
import UserRoles from "../../../contexts/backoffice/Shared/UserRoles";
import Pagination from "../../../contexts/shared/domain/Pagination";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import HttpError from "../../core/HttpError";
import SecurityMidleware from "../../middlewares/SecurityMiddleware";

export default class CustomerController implements ExpressController {
  mainRoute: string = "/customers";
  private _router: Router;
  private _customerService: CustomerService;
  private _securityMiddleware: SecurityMidleware;
  constructor(
    customerService: CustomerService,
    securityMiddleware: SecurityMidleware
  ) {
    this._customerService = customerService;
    this._securityMiddleware = securityMiddleware;
    this._router = Router();
  }
  get router() {
    this._router.post(
      "/",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.ENCARGADO, UserRoles.GESTOR])
        .bind(this._securityMiddleware),
      this.insertCustomer.bind(this)
    );
    this._router.put(
      "/:id",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.ENCARGADO, UserRoles.GESTOR])
        .bind(this._securityMiddleware),
      this.updateCustomer.bind(this)
    );
    this._router.get(
      "/",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.ENCARGADO, UserRoles.GESTOR])
        .bind(this._securityMiddleware),
      this.findAll.bind(this)
    );
    this._router.get(
      "/:id",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.ENCARGADO, UserRoles.GESTOR])
        .bind(this._securityMiddleware),
      this.findById.bind(this)
    );
    return this._router;
  }
  private async insertCustomer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const customer = {
      ...req.body,
      dateOfBirth: new Date(req.body.dateOfBirth),
    } as Customer;
    try {
      await this._customerService.insertCustomer(customer);
      res.status(HttpCode.HTTP_OK).json({
        message:"OK"
      });
    } catch (err) {
      next(new HttpError(HttpCode.HTTP_BAD_REQUEST, (err as Error).message));
    }
  }
  private async updateCustomer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const customer = req.body as Customer;
    try {
      await this._customerService.updateCustomer({ ...customer, _id: id });
      res.status(HttpCode.HTTP_OK).json({
        message:"OK"
      });;
    } catch (err) {
      next(new HttpError(HttpCode.HTTP_BAD_REQUEST, (err as Error).message));
    }
  }
  private async findAll(req: Request, res: Response, next: NextFunction) {
    const filters: CustomerFilters = {
      email: req.body.email,
      enabled: req.body.enabled,
      name: req.body.name,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      dni: req.body.dni,
      phone: req.body.phone,
    };
    const pagination: Pagination = {
      ...req.query,
      sortAscending: true || req.query.sortAscending,
      limit: parseInt(req.query.limit as string) || 10,
    };
    try {
      const customers = await this._customerService.findAll(
        filters,
        pagination
      );
      res.status(HttpCode.HTTP_OK).json(customers);
    } catch (err) {
      const error: Error = err as Error;
      next(new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message));
    }
  }
  private async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const customer = await this._customerService.findById(id);
      res.status(HttpCode.HTTP_OK).json(customer);
    } catch (err) {
      const error: Error = err as Error;
      next(new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message));
    }
  }
}
