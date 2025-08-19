import { UserRepository, TokenUserDto } from "../..";

export class LogoutUser {
    constructor(public repository: UserRepository) {}

    async execute(dto: TokenUserDto): Promise<void> {
        return this.repository.logout(dto);
    }
}