import { AuthRepository, RegisterUserDto } from "../..";

export class RegisterAuth {
  constructor(public repository: AuthRepository) {}
  async execute(dto: RegisterUserDto): Promise<string> {
    return this.repository.register(dto);
  }
}
