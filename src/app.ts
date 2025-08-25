import "reflect-metadata";
import { envs } from "./config/envs";
import { AppRouter } from "./presentation/router";
import { Server } from "./presentation/server";
import { prisma } from "./data/postgresql";

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRouter.router(),
  });

  server.start();

  // IMPORTANT: Seed data for testing purposes, REMOVE when finish development
  // (async () => {
  //   await prisma.user.createMany({
  //     data: [
  //       {
  //         name: "Elian",
  //         email: "e@e.com",
  //         password: "123456",
  //       },
  //       {
  //         name: "Ricardo",
  //         email: "r@r.com",
  //         password: "654321",
  //       },
  //     ],
  //   });

  //   await prisma.chat.createMany({
  //     data: [
  //       {
  //         userId: 1,
  //       },
  //       {
  //         userId: 2,
  //       },
  //     ],
  //   });

  //   await prisma.chatMessage.createMany({
  //     data: [
  //       {
  //         chatId: 1,
  //         senderId: 1,
  //         receiverId: 2,
  //         message: "Hello, how are you?",
  //       },
  //       {
  //         chatId: 1,
  //         senderId: 2,
  //         receiverId: 1,
  //         message: "I'm fine, thank you!",
  //       },
  //     ],
  //   });
  // })();
}
