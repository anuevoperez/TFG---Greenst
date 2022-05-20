import { NextFunction, Request, Response, Router } from "express";
import EmployeeService from "../../../contexts/backoffice/Employee/application/EmployeeService";
import Employee from "../../../contexts/backoffice/Employee/domain/Employee";
import EmployeeFilters from "../../../contexts/backoffice/Employee/domain/EmployeeFilters";
import UserRoles from "../../../contexts/backoffice/Shared/UserRoles";
import Pagination from "../../../contexts/shared/domain/Pagination";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import HttpError from "../../core/HttpError";
import SecurityMidleware from "../../middlewares/SecurityMiddleware";

export default class EmployeeController implements ExpressController {
  mainRoute: string = "/employees";
  private _router: Router;
  private _employeeService: EmployeeService;
  private _securityMiddleware: SecurityMidleware;
  constructor(
    employeeService: EmployeeService,
    securityMiddleware: SecurityMidleware
  ) {
    this._employeeService = employeeService;
    this._securityMiddleware = securityMiddleware;
    this._router = Router();
  }
  get router() {
    this._router.post(
      "/",
     /*  this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware.checkRole([UserRoles.ENCARGADO]), */
      this.insertEmployee.bind(this)
    );
    this._router.put(
      "/:id",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware.checkRole([UserRoles.ENCARGADO]).bind(this._securityMiddleware),      this.updateEmployee.bind(this)
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
  private async insertEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const employee = req.body as Employee;
    try {
      await this._employeeService.insertEmployee(employee);
      res.status(HttpCode.HTTP_CREATED).end();
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
  private async updateEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const employee = req.body as Employee;
    try {
      await this._employeeService.updateEmployee({ ...employee, _id: id });
      res.status(HttpCode.HTTP_OK).end();
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
  private async findAll(req: Request, res: Response, next: NextFunction) {
    const filters = req.query as EmployeeFilters;
    const pagination = {
      ...req.query,
      sortAscending: true,
      limit: parseInt(req.query.limit as string) || 10,
    } as Pagination;
    try {
      const employees = await this._employeeService.findAll(
        filters,
        pagination
      );
      res.status(HttpCode.HTTP_PARTIAL_CONTENT).json(employees);
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
  private async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const employee = await this._employeeService.findById(id);
      res.status(HttpCode.HTTP_OK).json(employee);
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
}
