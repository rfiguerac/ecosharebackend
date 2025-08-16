import express, { Router } from "express";

interface Options {
  routes: Router;
  port: number;
}

export class Server {
  private app = express();
  private routes: Router;
  private readonly port: number;

  constructor(option: Options) {
    const { routes } = option;
    this.routes = routes;
    this.port = option.port;
  }

  async start() {
    // Middleware
    this.app.use(express.json());

    // public folder
    this.app.use(express.static("public"));

    //* Router
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
