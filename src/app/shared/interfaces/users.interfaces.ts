export interface IUser {
  id: string,
  name: string,
}

export interface IParsedGoogleUser {
  email: string,
  firstName: string,
  secondName: string,
}

export interface IAuthRecovery {
  token: string,
  user: IParsedGoogleUser,
}



