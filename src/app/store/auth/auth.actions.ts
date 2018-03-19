import {Action} from '@ngrx/store'


export enum AuthActionTypes {
  CHECK_TOKEN = '[AUTH] CHECK_TOKEN',
  CHECK_TOKEN_SUCCESS = '[AUTH] CHECK_TOKEN_SUCCESS',
  CHECK_TOKEN_FAILURE = '[AUTH] CHECK_TOKEN_FAILURE',
  TRY_LOGIN = '[AUTH] TRY_LOGIN',
  LOGIN_SUCCESS = '[AUTH] LOGIN_SUCCESS',
  LOGIN_FAILURE = '[AUTH] LOGIN_FAILURE',
  LOGIN_LOGOUT = '[AUTH] LOGOUT',
}


export class TryLogin implements Action {
  readonly type = AuthActionTypes.TRY_LOGIN;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public user?){}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
}

export class CheckToken implements Action {
  readonly type = AuthActionTypes.CHECK_TOKEN;
}

export class CheckTokenFailure implements Action {
  readonly type = AuthActionTypes.CHECK_TOKEN_FAILURE;
}

export class CheckTokenSuccess implements Action {
  readonly type = AuthActionTypes.CHECK_TOKEN_SUCCESS;
}


export class Logout implements Action {
  readonly type = AuthActionTypes.LOGIN_LOGOUT;
}

export type AuthActionsType =
  TryLogin |
  CheckToken |
  CheckTokenFailure |
  CheckTokenSuccess |
  LoginSuccess |
  LoginFailure |
  Logout
