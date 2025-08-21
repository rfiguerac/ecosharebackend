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
      where: { email: dto.email, password: dto.password },
    });
    if (!user) {
      throw new HttpException(404, "User not found");
    }

    const isValid = bcryptAdapter.compare(dto.password, user.password);
    if (!isValid) {
      throw new HttpException(401, "Invalid credentials");
    }
    return User.fromObject(user);
  }

  async register(dto: RegisterUserDto): Promise<User> {
    const hashedPassword = bcryptAdapter.hash(dto.password);
    const user = await prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        role: dto.role,
      },
    });
    return User.fromObject(user);
  }

  async logout(dto: TokenUserDto): Promise<void> {
    await prisma.userToken.delete({
      where: { token: dto.token },
    });
  }
  async refreshToken(dto: TokenUserDto): Promise<TokenUserDto> {
    const userToken = await prisma.userToken.findUnique({
      where: { token: dto.token },
      include: { user: true },
    });

    if (!userToken) {
      throw new HttpException(404, "Token not found");
    }

    const { id, email } = userToken.user;
    const newToken = await JwtAdapter.generateToken({ id , email });
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
  async updateProfile(tokenDto: TokenUserDto, updateUserDto: UpdateUserDto): Promise<User> {
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
