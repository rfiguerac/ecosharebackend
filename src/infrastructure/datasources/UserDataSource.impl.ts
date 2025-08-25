import { prisma } from "../../data/postgresql";
import { HttpException } from "../../presentation/errors/httpException";
import { JwtAdapter } from "../../config/jwt.adapter";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import {
  User,
  UserToken,
  UserDataSource,
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  TokenUserDto,
  ChangePasswordUserDto,
} from "../../domain";

export class UserDataSourceImpl implements UserDataSource {
  async login(dto: LoginUserDto): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HttpException(404, "User not found");
    }

    const isValid = bcryptAdapter.compare(dto.password, user.password);
    if (!isValid) {
      throw new HttpException(401, "Invalid credentials");
    }
    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw new HttpException(500, "Error generating token");

    // Crea el token de refresco y lo guarda en la base de datos
    const refreshToken = await JwtAdapter.generateToken({ id: user.id }, "7d");
    if (!refreshToken)
      throw new HttpException(500, "Error generating refresh token");

    const userWithTokens = User.fromObject(user);
    userWithTokens.accessToken = token;
    userWithTokens.refreshToken = refreshToken;

    return userWithTokens;
  }

  async register(dto: RegisterUserDto): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new HttpException(409, "User already exists");
    }

    const hashedPassword = bcryptAdapter.hash(dto.password);
    const user = await prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        role: dto.role,
      },
    });

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw new HttpException(500, "Error generating token");

    // Crea el token de refresco y lo guarda en la base de datos
    const refreshToken = await JwtAdapter.generateToken({ id: user.id }, "7d");
    if (!refreshToken)
      throw new HttpException(500, "Error generating refresh token");

    const userWithTokens = User.fromObject(user);
    userWithTokens.accessToken = token;
    userWithTokens.refreshToken = refreshToken;

    return userWithTokens;
  }

  async getById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    return User.fromObject(user);
  }

  async logout(dto: TokenUserDto): Promise<void> {
    await prisma.userToken.delete({
      where: { token: dto.token },
    });
  }
  async refreshToken(dto: TokenUserDto): Promise<UserToken> {
    const userToken = await prisma.userToken.findUnique({
      where: { token: dto.token },
      include: { user: true },
    });

    if (!userToken) {
      throw new HttpException(404, "Token not found");
    }

    const { id, email } = userToken.user;
    const newToken = await JwtAdapter.generateToken({ id, email });
    return UserToken.fromObject(newToken);
  }

  async deleteAccount(dto: TokenUserDto): Promise<User> {
    const userToken = await prisma.userToken.findUnique({
      where: { token: dto.token },
      include: { user: true },
    });

    if (!userToken) {
      throw new HttpException(404, "Token not found");
    }

    const user = userToken.user;
    await prisma.user.delete({ where: { id: user.id } });
    return User.fromObject(user);
  }
  async updateProfile(
    tokenDto: TokenUserDto,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const userToken = await prisma.userToken.findUnique({
      where: { token: tokenDto.token },
      include: { user: true },
    });

    if (!userToken) {
      throw new HttpException(404, "Token not found");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userToken.user.id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
      },
    });
    return User.fromObject(updatedUser);
  }

  async changePassword(dto: ChangePasswordUserDto): Promise<User> {
    const userToken = await prisma.userToken.findUnique({
      where: { token: dto.token },
      include: { user: true },
    });

    if (!userToken) {
      throw new HttpException(404, "User not found");
    }

    const user = userToken.user;
    const hashedPassword = bcryptAdapter.hash(dto.newPassword);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    return User.fromObject(updatedUser);
  }
}
