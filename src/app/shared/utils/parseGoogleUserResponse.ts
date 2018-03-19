import {IParsedGoogleUser} from "../interfaces/users.interfaces"

export function parseGoogleUserResponse(user): IParsedGoogleUser {
  return {
    email: user.w3.U3,
    firstName: user.w3.ofa,
    secondName: user.w3.wea,
  }

}
