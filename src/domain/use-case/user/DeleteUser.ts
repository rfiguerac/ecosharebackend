import { UserRepository, TokenUserDto, User } from "../..";

export class DeleteUser {
    constructor(public repository: UserRepository) {}

    async execute(dto: TokenUserDto): Promise<User> {
        return this.repository.deleteAccount(dto);
    }
}