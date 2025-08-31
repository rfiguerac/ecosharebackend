// src/presentation/socketServer.ts
import { Server as HttpServer } from "http";
import { Server as IOServer, Socket } from "socket.io";
import { ChatMessage } from "../domain";

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

    socket.on("send_message", async (data: ChatMessage) => {
      console.log("Mensaje recibido:", data);
      // Emitir el mensaje a todos los clientes en la sala del chat
      io.to(`chat-${data.chatId}`).emit("message_from_server", data);
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado:", socket.id);
    });
  });

  return io;
}
