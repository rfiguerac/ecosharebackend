import { UserRepository, TokenUserDto, UserToken } from "../..";

export class RefreshTokenUser {
	constructor(public repository: UserRepository) {}
	async execute(dto: TokenUserDto): Promise<UserToken> {
		return this.repository.refreshToken(dto);
	}
}
