import { UserRepository, ChangePasswordUserDto, User } from "../..";

export class ChangePasswordUser {
    constructor(public repository: UserRepository) {}

    async execute(dto: ChangePasswordUserDto): Promise<User> {
        return this.repository.changePassword(dto);
    }
}