import { UserRepository, TokenUserDto } from "../..";

export class RefreshTokenUser {
	constructor(public repository: UserRepository) {}
	async execute(dto: TokenUserDto): Promise<TokenUserDto> {
		return this.repository.refreshToken(dto);
	}
}
