import {IParsedGoogleUser} from "../interfaces/users.interfaces"

export class AuthorizedUser {
  public email: string
  public firstName: string
  public secondName: string
  public fullName: string

  constructor(user: IParsedGoogleUser) {
    this.email = user.email
    this.firstName = user.firstName
    this.secondName = user.secondName
    this.fullName = `${this.firstName} ${this.secondName}`
  }
}
