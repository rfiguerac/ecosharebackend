import { Request, Response } from "express";
import { 
  UserRepository,
  LoginUser,
  RegisterUser,
  LogoutUser,
  RefreshTokenUser,
  UpdateUser,
  ChangePasswordUser,
  DeleteUser
} from "../../domain";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  login = async (req: Request, res: Response) => {
    try {
      const user = await new LoginUser(this.userRepository).execute(req.body);
      res.status(200).json(user.toResponse());
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const user = await new RegisterUser(this.userRepository).execute(req.body);
      res.status(201).json(user.toResponse());
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      await new LogoutUser(this.userRepository).execute(req.body);
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  refresh = async (req: Request, res: Response) => {
    try {
      const token = await new RefreshTokenUser(this.userRepository).execute(req.body);
      res.status(200).json(token.toResponse());
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const token = req.body.token;
      const user = await new UpdateUser(this.userRepository).execute(token, req.body);
      res.status(200).json(user.toResponse());
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const token = req.body.token;
      const user = await new DeleteUser(this.userRepository).execute(token);
      res.status(200).json(user.toResponse());
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const user = await new ChangePasswordUser(this.userRepository).execute(req.body);
      res.status(200).json(user.toResponse());
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
