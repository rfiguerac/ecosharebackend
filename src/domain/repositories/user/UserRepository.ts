import {
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  TokenUserDto,
  ChangePasswordUserDto,
  User,
  UserToken,
} from "../..";

export abstract class UserRepository {
  abstract login(dto: LoginUserDto): Promise<User>;
  abstract register(dto: RegisterUserDto): Promise<User>;
  abstract logout(token: TokenUserDto): Promise<void>;
  abstract refreshToken(token: TokenUserDto): Promise<UserToken>;
  abstract deleteAccount(token: TokenUserDto): Promise<User>;
  abstract updateProfile(
    token: TokenUserDto,
    dto: UpdateUserDto
  ): Promise<User>;
  abstract changePassword(
    changePasswordUserDto: ChangePasswordUserDto
  ): Promise<User>;
  abstract getById(id: number): Promise<User>;
  abstract getAll(): Promise<User[]>;
}
