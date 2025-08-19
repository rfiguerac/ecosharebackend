import { Request, Response } from "express";
import { UserRepository } from "../../domain";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  login = (req: Request, res: Response) => {
    res.status(200).json({ message: "Login successful" });
  };
  register = (req: Request, res: Response) => {
    res.status(201).json({ message: "Registration successful" });
  };
  logout = (req: Request, res: Response) => {
    res.status(200).json({ message: "Logout successful" });
  };
  refresh = (req: Request, res: Response) => {
    res.status(200).json({ message: "Token refreshed successfully" });
  };
  updateProfile = (req: Request, res: Response) => {
    res.status(200).json({ message: "Profile updated successfully" });
  };
  changePassword = (req: Request, res: Response) => {
    res.status(200).json({ message: "Password changed successfully" });
  };
}
