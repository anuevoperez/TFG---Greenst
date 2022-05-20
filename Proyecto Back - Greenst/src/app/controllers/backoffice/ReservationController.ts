import { NextFunction, Request, Response, Router } from "express";
import ReservationService from "../../../contexts/backoffice/Reservation/application/ReservationService";
import Reservation from "../../../contexts/backoffice/Reservation/domain/Reservation";
import ReservationFilters from "../../../contexts/backoffice/Reservation/domain/ReservationFilters";
import UserRoles from "../../../contexts/backoffice/Shared/UserRoles";
import Pagination from "../../../contexts/shared/domain/Pagination";
import ExpressController from "../../core/ExpressController";
import { HttpCode } from "../../core/HttpCode";
import HttpError from "../../core/HttpError";
import SecurityMidleware from "../../middlewares/SecurityMiddleware";

export default class ReservationController implements ExpressController {
  mainRoute: string = "/reservations";
  private _router: Router;
  private _reservationService: ReservationService;
  private _securityMiddleware: SecurityMidleware;
  constructor(
    reservationService: ReservationService,
    securityMiddleware: SecurityMidleware
  ) {
    this._reservationService = reservationService;
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
      this.insertReservation.bind(this)
    );
    this._router.put(
      "/:id",
      this._securityMiddleware.authenticateToken.bind(this._securityMiddleware),
      this._securityMiddleware
        .checkRole([UserRoles.ENCARGADO, UserRoles.GESTOR])
        .bind(this._securityMiddleware),
      this.updateReservation.bind(this)
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
  private async insertReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reservation = req.body as Reservation;
      await this._reservationService.insertReservation({
        ...reservation,
        _id: undefined,
      });
      res.status(HttpCode.HTTP_CREATED).end();
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
  private async updateReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const reservation = req.body as Reservation;
      await this._reservationService.updateReservation({
        ...reservation,
        _id: id,
      });
      res.status(HttpCode.HTTP_CREATED).end();
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = req.query as ReservationFilters;
      const pagination = {
        ...req.query,
        limit: parseInt(req.query.limit as string) || 10,
      } as Pagination;
      const reservations = await this._reservationService.findAll(
        filters,
        pagination
      );
      res.status(HttpCode.HTTP_PARTIAL_CONTENT).json(reservations);
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
  private async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const reservation = await this._reservationService.findById(id);
      res.status(HttpCode.HTTP_OK).json(reservation);
    } catch (err) {
      const error: Error = err as Error;
      const httpError = new HttpError(HttpCode.HTTP_BAD_REQUEST, error.message);
      next(httpError);
    }
  }
}
