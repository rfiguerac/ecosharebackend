import { User } from "../../entities";
import { UserRepository } from "../../repositories";

export class GetAllUser {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
