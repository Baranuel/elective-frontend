export class UsersEntity {
  constructor(
    public username: string,
    public password: string,
    public role?: string,
    public name?: string,
    public email?: string
  ) {}
}
