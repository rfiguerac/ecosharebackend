export class Auth {
  constructor(
    public email: string,
    public name: string,
    private password: string,
    public role: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static fromObject(data: any): Auth {
    return new Auth(
      data.email,
      data.name,
      data.password,
      data.role,
      data.createdAt,
      data.updatedAt
    );
  }
}
