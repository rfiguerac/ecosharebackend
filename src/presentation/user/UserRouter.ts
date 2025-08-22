import { Router } from "express";
import { UserRepositoryImpl, UserDataSourceImpl } from "../../infrastructure";
import { UserController } from "./UserController";
import { validateDto } from "../../middleware";
import {
  RegisterUserDto,
  LoginUserDto,
  TokenUserDto,
  UpdateUserDto,
} from "../../domain";
import { AuthMiddleware } from "../../middleware/auth.middleware"; // Importa el middleware de autenticación

export class UserRouter {
  public static router(): Router {
    const router = Router();
    const datasource = new UserDataSourceImpl();
    const userRepository = new UserRepositoryImpl(datasource);
    const userController = new UserController(userRepository);

    // Rutas públicas de autenticación
    router.post(
      "/register",
      validateDto(RegisterUserDto),
      userController.register
    );
    router.post("/login", validateDto(LoginUserDto), userController.login);

    // Rutas protegidas que requieren JWT
    router.use(AuthMiddleware.validateJWT); // Aplica el middleware a las rutas siguientes
    router.get("/profile", userController.getProfile);
    router.post("/refresh", validateDto(TokenUserDto), userController.refresh);
    router.put(
      "/update",
      validateDto(UpdateUserDto),
      userController.updateUser
    );
    router.delete(
      "/delete",
      validateDto(TokenUserDto),
      userController.deleteUser
    );
    router.post("/change-password", userController.changePassword);
    router.post("/logout", userController.logout);

    return router;
  }
}
