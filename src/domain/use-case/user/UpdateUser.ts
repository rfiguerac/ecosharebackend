import { UserRepository, UpdateUserDto, TokenUserDto, User } from "../..";

export class UpdateUser {
    constructor(public repository: UserRepository) {}

	async execute(tokenDto: TokenUserDto, updateUserDto: UpdateUserDto): Promise<User> {
		return this.repository.updateProfile(tokenDto, updateUserDto);
	}
}
