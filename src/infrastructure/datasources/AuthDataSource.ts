import { AuthDataSource } from "../../domain";

export class AuthDataSourceImpl implements AuthDataSource {
  async login(dto: LoginUserDto): Promise<string> {}

  async register(dto: RegisterUserDto): Promise<string> {
    // Implementation for register
  }

  async logout(token: string): Promise<void> {
    // Implementation for logout
  }

  async refreshToken(token: string): Promise<string> {
    // Implementation for refreshToken
  }

  async deleteAccount(token: string): Promise<void> {
    // Implementation for deleteAccount
  }

  async updateProfile(dto: UpdateUserDto): Promise<void> {
    // Implementation for updateProfile
  }
}
