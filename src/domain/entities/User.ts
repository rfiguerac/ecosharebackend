export type UserRole = "Admin" | "User";

export class User {
  constructor(
    public id: number,
    public email: string,
    public name: string,
    private password: string,
    public role: UserRole = "User",
    public tokenId?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public accessToken?: string, // Agregado
    public refreshToken?: string // Agregado
  ) {}

  public static fromObject(userData: any): User {
    return new User(
      userData.id,
      userData.email,
      userData.name,
      userData.password,
      userData.role,
      userData.tokenId,
      userData.createdAt,
      userData.updatedAt,
      userData.accessToken, // Agregado
      userData.refreshToken // Agregado
    );
  }

  public toResponse() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      accessToken: this.accessToken, // Agregado
      refreshToken: this.refreshToken, // Agregado
    };
  }
}
