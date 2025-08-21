import { Router } from "express";
import { UserRepositoryImpl, UserDataSourceImpl } from "../../infrastructure";
import { UserController } from "./UserController";
import { validateDto } from "../../middleware";
import { RegisterUserDto, LoginUserDto, TokenUserDto, UpdateUserDto,  } from "../../domain";

export class UserRouter {
  public static router(): Router {
    const router = Router();
    const datasource = new UserDataSourceImpl();
    const userRepository = new UserRepositoryImpl(datasource);
    const userController = new UserController(userRepository);

    router.post("/register", validateDto(RegisterUserDto), userController.register);
    router.post("/login", validateDto(LoginUserDto), userController.login);
    router.post("/refresh", validateDto(TokenUserDto), userController.refresh);
    router.put("/update", validateDto(TokenUserDto), validateDto(UpdateUserDto), userController.updateUser);
    router.delete("/delete", validateDto(TokenUserDto), userController.deleteUser);
    router.post("/change-password", validateDto(TokenUserDto), userController.changePassword);
    router.post("/logout", userController.logout);

    return router;
  }
}
