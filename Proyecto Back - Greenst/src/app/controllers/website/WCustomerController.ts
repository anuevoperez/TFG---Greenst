import { NextFunction, Router, Request, Response } from "express";
import CustomerService from "../../../contexts/website/Customer/application/WCustomerService";
import Customer from "../../../contexts/website/Customer/domain/Customer";
import UserRoles from "../../../contexts/website/Shared/UserRoles";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import HttpError from "../../core/HttpError";
import SecurityMidleware from "../../middlewares/SecurityMiddleware";

export default class WCustomerController implements ExpressController {
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
      /* this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware.checkRole([UserRoles.CLIENTE]).bind(this._securityMiddleware),    
       */ this.insertCustomer.bind(this)
    );
    this._router.put(
      "/",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.CLIENTE])
        .bind(this._securityMiddleware),
      this.updateCustomer.bind(this)
    );

    this._router.get(
      "/",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.CLIENTE])
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
      dateOfBirth:new Date(req.body.dateOfBirth),
    } as Customer;
    try {
      await this._customerService.insertCustomer({
        ...customer,
        enabled: true,
      });
      res.status(HttpCode.HTTP_OK).json({
        message:"OK"
      });;
    } catch (err) {
      next(new HttpError(HttpCode.HTTP_BAD_REQUEST, (err as Error).message));
    }
  }
  private async updateCustomer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = res.locals.tokenPayload;
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
  private async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals.tokenPayload;
    try {
      const customer = await this._customerService.findById(id);
      res.status(HttpCode.HTTP_OK).json(customer);
    } catch (err) {
      const error: Error = err as Error;
      next(new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message));
    }
  }
}
