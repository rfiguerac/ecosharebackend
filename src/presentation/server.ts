import express, { Router } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorHandler } from "./errors/errorHandler";
import { setupSocketServer } from "./socketServer";
import { Server as HttpServer } from "http";

interface Options {
  routes: Router;
  port: number;
}

export class Server {
  private app = express();
  private httpServer: HttpServer = new HttpServer(this.app);
  private routes: Router;
  private readonly port: number;

  constructor(option: Options) {
    const { routes } = option;
    this.routes = routes;
    this.port = option.port;
  }

  async start() {
    //* Socket Server
    const io = setupSocketServer(this.httpServer);

    //* Middlewares
    this.app.use(cors());
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );

    //* Public Folder

    this.app.use(express.static("public"));

    //* Router
    this.app.use(this.routes);

    this.app.use(errorHandler);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
