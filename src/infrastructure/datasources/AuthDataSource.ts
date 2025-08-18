import {
  AuthDataSource,
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
} from "../../domain";

export class AuthDataSourceImpl implements AuthDataSource {
  login(dto: LoginUserDto): Promise<string> {
    throw new Error("Method not implemented.");
  }
  register(dto: RegisterUserDto): Promise<string> {
    throw new Error("Method not implemented.");
  }
  logout(token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  refreshToken(token: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  deleteAccount(token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateProfile(token: string, dto: UpdateUserDto): Promise<string> {
    throw new Error("Method not implemented.");
  }
  changePassword(token: string, newPassword: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
