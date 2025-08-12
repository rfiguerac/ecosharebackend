import { envs } from "./config/envs";
import { AppRouter } from "./presentation/router";

import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRouter.router(),
  });

  server.start();
}
