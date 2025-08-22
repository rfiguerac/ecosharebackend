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

		socket.on("chat:message", (data) => {
			io.emit("chat:message", data);
		});

		socket.on("disconnect", () => {
			console.log("Usuario desconectado:", socket.id);
		});
	});

	return io;
}
