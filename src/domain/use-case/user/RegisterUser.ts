import { UserRepository, RegisterUserDto, User } from "../..";

export class RegisterUser {
  constructor(public repository: UserRepository) {}
  async execute(dto: RegisterUserDto): Promise<User> {
    return this.repository.register(dto);
  }
}
