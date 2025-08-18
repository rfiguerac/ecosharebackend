import { LoginUserDto, RegisterUserDto, UpdateUserDto } from "..";

export abstract class AuthDataSource {
  abstract login(dto: LoginUserDto): Promise<string>;
  abstract register(dto: RegisterUserDto): Promise<string>;
  abstract logout(token: string): Promise<void>;
  abstract refreshToken(token: string): Promise<string>;
  abstract deleteAccount(token: string): Promise<void>;
  abstract updateProfile(token: string, dto: UpdateUserDto): Promise<string>;
  abstract changePassword(token: string, newPassword: string): Promise<string>;
}
