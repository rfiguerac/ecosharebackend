import { Server as HttpServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

export function setupSocketServer(httpServer: HttpServer): IOServer {
  const io = new IOServer(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("Usuario conectado:", socket.id);

    // Nuevo evento para que el cliente se una a una sala de chat específica
    socket.on("join_chat", (chatId: number) => {
      socket.join(`chat-${chatId}`);
      console.log(`Usuario ${socket.id} se unió a la sala de chat-${chatId}`);
    });

    socket.on("send_message", async (data) => {
      const sendMessageEmitted = io.emit("send_message", data);
      const receivedMessageEmitted = socket
        .to(data.chatId)
        .emit("receive_message", data);
      console.log("'send_message' emmited", sendMessageEmitted);
      console.log("'receive_message' emmited", receivedMessageEmitted);
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado:", socket.id);
    });
  });

  return io;
}
