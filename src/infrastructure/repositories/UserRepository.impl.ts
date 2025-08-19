import {
  UserRepository,
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  TokenUserDto,
  ChangePasswordUserDto,
  UserDataSource,
  User,
} from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private dataSource: UserDataSource) {}

  async login(dto: LoginUserDto): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async register(dto: RegisterUserDto): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async logout(token: TokenUserDto): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async refreshToken(token: TokenUserDto): Promise<TokenUserDto> {
    throw new Error("Method not implemented.");
  }
  async updateProfile(token: TokenUserDto, dto: UpdateUserDto): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async changePassword(changePasswordUserDto: ChangePasswordUserDto): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async deleteAccount(token: TokenUserDto): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
