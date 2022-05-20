import dotenv from "dotenv";
import cors from "cors";
import MongoConnection from "../contexts/shared/infrastructure/MongoConnectionService";
import ExpressServer from "./core/ExpressServer";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import AuthController from "./controllers/auth/AuthController";
import AuthService from "../contexts/auth/Authentication/application/AuthService";
import JWTService from "../contexts/auth/Authentication/infrastructure/JWTService";
import BCryptService from "../contexts/auth/Authentication/infrastructure/BcryptService";
import UserMongoRepository from "../contexts/auth/User/infrastructure/UserMongoRepository";
import RandomCryptoTokenService from "../contexts/auth/Authentication/infrastructure/RandomCryptoTokenService";
import NodeMailerService from "../contexts/auth/Authentication/infrastructure/NodeMailerService";
import SecurityMidleware from "./middlewares/SecurityMiddleware";
import UserService from "../contexts/auth/User/application/UserService";
import { errorLogger, errorMiddleware } from "./middlewares/Errors";
import BrandController from "./controllers/backoffice/BrandController";
import BrandService from "../contexts/backoffice/Brand/application/BrandService";
import BrandMongoRepository from "../contexts/backoffice/Brand/infrastructure/BrandMongoRepository";
import CityController from "./controllers/backoffice/CityController";
import CityService from "../contexts/backoffice/City/application/CityService";
import CityMongoRepository from "../contexts/backoffice/City/infrastructure/CityMongoRepository";
import CustomerController from "./controllers/backoffice/CustomerController";
import CustomerService from "../contexts/backoffice/Customer/application/CustomerService";
import CustomerMongoRepository from "../contexts/backoffice/Customer/infrastructure/CustomerMongoRepository";
import EmployeeController from "./controllers/backoffice/EmployeeController";
import EmployeeService from "../contexts/backoffice/Employee/application/EmployeeService";
import EmployeeMongoRepository from "../contexts/backoffice/Employee/infrastructure/EmployeeMongoRepository";
import ModelController from "./controllers/backoffice/ModelController";
import ModelService from "../contexts/backoffice/Model/application/ModelService";
import ModelMongoRepository from "../contexts/backoffice/Model/infrastructure/ModelMongoRepository";
import OfficeController from "./controllers/backoffice/OfficeController";
import OfficeService from "../contexts/backoffice/Office/application/OfficeService";
import OfficeMongoRepository from "../contexts/backoffice/Office/infrastructure/OfficeMongoRepository";
import ReservationController from "./controllers/backoffice/ReservationController";
import ReservationService from "../contexts/backoffice/Reservation/application/ReservationService";
import ReservationMongoRepository from "../contexts/backoffice/Reservation/infrastructure/ReservationMongoRepository";
import VehicleController from "./controllers/backoffice/VehicleController";
import VehicleService from "../contexts/backoffice/Vehicle/application/VehicleService";
import VehicleMongoRepository from "../contexts/backoffice/Vehicle/infrastructure/VehicleMongoRepository";
import WBrandController from "./controllers/website/WBrandController";
import WBrandService from "../contexts/website/Brand/application/WBrandService";
import WBrandMongoRepository from "../contexts/website/Brand/infrastructure/BrandMongoRepository";
import WCityController from "./controllers/website/WCityController";
import WCityService from "../contexts/website/City/application/WCityService";
import WCityMongoRepository from "../contexts/website/City/infrastructure/WCityMongoRepository";
import WCustomerController from "./controllers/website/WCustomerController";
import WCustomerService from "../contexts/website/Customer/application/WCustomerService";
import WCustomerMongoRepository from "../contexts/website/Customer/infrastructure/WCustomerMongoRepository";
import WModelController from "./controllers/website/WModelController";
import WModelService from "../contexts/website/Model/application/WModelService";
import WModelMongoRepository from "../contexts/website/Model/infrastructure/WModelMongoRepository";
import WOfficeController from "./controllers/website/WOfficeController";
import WOfficeService from "../contexts/website/Office/application/WOfficeService";
import WOfficeMongoRepository from "../contexts/website/Office/infrastructure/WOfficeMongoRepository";
import WReservationController from "./controllers/website/WReservationController";
import WReservationService from "../contexts/website/Reservation/application/WReservationService";
import WReservationMongoRepository from "../contexts/website/Reservation/infrastructure/WReservationMongoRepository";

dotenv.config();

const server = new ExpressServer(
  "3001",
  new MongoConnection(
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    process.env.DB_PATH as string
  )
);
server.addMiddleware(cors());
server.addMiddleware(helmet());
server.addMiddleware(express.json({ limit: "10kb" }));
server.addMiddleware(mongoSanitize());

server.addMiddleware(
  rateLimit({
    max: 10000,
    windowMs: 60 * 60 * 1000,
    message: "Too may request from this IP, please try again in an hour!",
  })
);
const userRepository = new UserMongoRepository();

const encryptionService = new BCryptService();

const tokenService = new JWTService();

const randomTokenService = new RandomCryptoTokenService();

const emailService = new NodeMailerService(
  process.env.EMAIL_HOST as string,
  process.env.EMAIL_PORT as string,
  process.env.EMAIL_USER as string,
  process.env.EMAIL_PASS as string
);

const userService = new UserService(
  userRepository,
  encryptionService,
  randomTokenService
);

const authService = new AuthService(tokenService, emailService, userService);
const securityMiddleware = new SecurityMidleware(tokenService);

//AuthControllers
const AUTH_URL = "/security";
server.addController(
  new AuthController(authService, securityMiddleware),
  AUTH_URL
);

//BackofficeControllers
const BACKOFFICE_URL = "/backoffice";
server.addController(
  new BrandController(
    new BrandService(new BrandMongoRepository()),
    securityMiddleware
  ),
  BACKOFFICE_URL
);
server.addController(
  new CityController(
    new CityService(new CityMongoRepository()),
    securityMiddleware
  ),
  BACKOFFICE_URL
);
server.addController(
  new CustomerController(
    new CustomerService(new CustomerMongoRepository(), encryptionService),
    securityMiddleware
  ),
  BACKOFFICE_URL
);
server.addController(
  new EmployeeController(
    new EmployeeService(new EmployeeMongoRepository(), encryptionService),
    securityMiddleware
  ),
  BACKOFFICE_URL
);
server.addController(
  new ModelController(
    new ModelService(new ModelMongoRepository()),
    securityMiddleware
  ),
  BACKOFFICE_URL
);
server.addController(
  new OfficeController(
    new OfficeService(new OfficeMongoRepository()),
    securityMiddleware
  ),
  BACKOFFICE_URL
);
server.addController(
  new ReservationController(
    new ReservationService(new ReservationMongoRepository()),
    securityMiddleware
  ),
  BACKOFFICE_URL
);
server.addController(
  new VehicleController(
    new VehicleService(new VehicleMongoRepository()),
    securityMiddleware
  ),
  BACKOFFICE_URL
);

//WebsiteController
const WEB_OFFICE = "/website";
server.addController(
  new WBrandController(
    new WBrandService(new WBrandMongoRepository()),
    securityMiddleware
  ),
  WEB_OFFICE
);
server.addController(
  new WCityController(
    new WCityService(new WCityMongoRepository()),
    securityMiddleware
  ),
  WEB_OFFICE
);
server.addController(
  new WCustomerController(
    new WCustomerService(new WCustomerMongoRepository(), encryptionService),
    securityMiddleware
  ),
  WEB_OFFICE
);
server.addController(
  new WModelController(
    new WModelService(new WModelMongoRepository()),
    securityMiddleware
  ),
  WEB_OFFICE
);
server.addController(
  new WOfficeController(
    new WOfficeService(new WOfficeMongoRepository()),
    securityMiddleware
  ),
  WEB_OFFICE
);
server.addController(
  new WReservationController(
    new WReservationService(new WReservationMongoRepository()),
    securityMiddleware
  ),
  WEB_OFFICE
);
server.addMiddleware(errorLogger);
server.addMiddleware(errorMiddleware);

server.listen();
