import {
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  TokenUserDto,
  ChangePasswordUserDto,
  UserRepository,
  UserDataSource,
  User,
  UserToken,
} from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private dataSource: UserDataSource) {}

  async login(dto: LoginUserDto): Promise<User> {
    return this.dataSource.login(dto);
  }

  async register(dto: RegisterUserDto): Promise<User> {
    return this.dataSource.register(dto);
  }

  async getById(id: number): Promise<User> {
    return this.dataSource.getById(id);
  }

  async logout(dto: TokenUserDto): Promise<void> {
    return this.dataSource.logout(dto);
  }

  async refreshToken(dto: TokenUserDto): Promise<UserToken> {
    return this.dataSource.refreshToken(dto);
  }
  async updateProfile(
    tokenDto: TokenUserDto,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.dataSource.updateProfile(tokenDto, updateUserDto);
  }

  async changePassword(dto: ChangePasswordUserDto): Promise<User> {
    return this.dataSource.changePassword(dto);
  }

  async deleteAccount(dto: TokenUserDto): Promise<User> {
    return this.dataSource.deleteAccount(dto);
  }
}
