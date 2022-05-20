import express, { Application } from "express";
import ExpressController from "./ExpressController";
import Connection from "../../contexts/shared/domain/Connection";
class ExpressServer {
  private app: Application;
  private port: string;
  private persistence: Connection;
  constructor(port: string = "3000", persistence: Connection) {
    this.persistence = persistence;
    this.app = express();
    this.port = port;
  }
  addController(controller: ExpressController, route?: string) {
    if (route) {
      this.app.use(route+controller.mainRoute, controller.router);
      return;;
    }
    this.app.use(controller.mainRoute, controller.router);
  }
  addMiddleware(...params: any[]) {
    this.app.use(...params);
  }
  async listen() {
    await this.persistence.connect();
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
export default ExpressServer;
