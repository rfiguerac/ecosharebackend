import {
  AuthRepository,
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
} from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  async login(dto: LoginUserDto): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async register(dto: RegisterUserDto): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async logout(token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async refreshToken(token: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  async updateProfile(token: string, dto: UpdateUserDto): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async changePassword(token: string, newPassword: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async deleteAccount(token: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
