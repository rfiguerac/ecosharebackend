import { LoginUserDto, RegisterUserDto, UpdateUserDto, TokenUserDto, ChangePasswordUserDto, User, RefreshTokenUser, UserToken } from "..";

export abstract class UserDataSource {
  abstract login(dto: LoginUserDto): Promise<User>;
  abstract register(dto: RegisterUserDto): Promise<User>;
  abstract logout(token: TokenUserDto): Promise<void>;
  abstract refreshToken(token: TokenUserDto): Promise<UserToken>;
  abstract deleteAccount(token: TokenUserDto): Promise<User>;
  abstract updateProfile(token: TokenUserDto, dto: UpdateUserDto): Promise<User>;
  abstract changePassword(changePasswordUserDto: ChangePasswordUserDto): Promise<User>;
}
