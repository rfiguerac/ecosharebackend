export class User {
  constructor(
    public id: number,
    public email: string,
    public name: string,
    private password: string,
    public role: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  public static fromObject(userData: User): User {
    return new User(
      userData.id,
      userData.email,
      userData.name,
      userData.password,
      userData.role,
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

