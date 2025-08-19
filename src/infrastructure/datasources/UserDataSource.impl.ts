import { prisma } from "../../data/postgresql";
import {
  User,
  UserDataSource,
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  TokenUserDto,
  ChangePasswordUserDto,
} from "../../domain";
import { HttpException } from "../../presentation/errors/httpException";

export class UserDataSourceImpl implements UserDataSource {
  async login(dto: LoginUserDto): Promise<User> {
    throw new Error("Method not implemented.");
  }
  register(dto: RegisterUserDto): Promise<User> {
    throw new Error("Method not implemented.");
  }
  logout(token: TokenUserDto): Promise<void> {
    throw new Error("Method not implemented.");
  }
  refreshToken(token: TokenUserDto): Promise<TokenUserDto> {
    throw new Error("Method not implemented.");
  }
  deleteAccount(token: TokenUserDto): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updateProfile(token: TokenUserDto, dto: UpdateUserDto): Promise<User> {
    throw new Error("Method not implemented.");
  }
  changePassword(changePasswordUserDto: ChangePasswordUserDto): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
