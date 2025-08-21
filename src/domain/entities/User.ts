export type UserRole = "Admin" | "User";

export class User {
  constructor(
    public id: number,
    public email: string,
    public name: string,
    private password: string,
    public role: UserRole,
    public tokenId?: number,
    public createdAt?: Date,
    public updatedAt?: Date
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
      userData.updatedAt
    );
  }
  
  public toResponse() {
    // Note: Password should not be included in the response for security reasons
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      tokenId: this.tokenId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

