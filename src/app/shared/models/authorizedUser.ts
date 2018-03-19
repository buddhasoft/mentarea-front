export class AuthorizedUser {
  public email: string
  public firstName: string
  public secondName: string
  public fullName: string

  constructor(user) {
    this.email = user.email
    this.firstName = user.firstName
    this.secondName = user.secondName
    this.fullName = `${this.firstName} ${this.secondName}`
  }
}
