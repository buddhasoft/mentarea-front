import {IParsedGoogleUser, IUser} from "../interfaces/users.interfaces"
import {USERS} from "../constants/users"

export class AuthorizedUser {
  public email: string
  public firstName: string
  public secondName: string
  public fullName: string
  public userName: string

  constructor(googleUser: IParsedGoogleUser) {
    this.email = googleUser.email
    this.firstName = googleUser.firstName
    this.secondName = googleUser.secondName
    this.userName = USERS.filter(user => user.id === googleUser.email)[0]['name']
    this.fullName = `${this.firstName} ${this.secondName}`
  }
}
