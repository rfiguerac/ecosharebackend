import { UserRepository, LoginUserDto, User } from "../..";

export class LoginUser {
    constructor(public repository: UserRepository) {}
    
    async execute(dto: LoginUserDto): Promise<User> {
        return this.repository.login(dto);
    }
}