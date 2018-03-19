import {Action} from '@ngrx/store'
import {AuthorizedUser} from "../../shared/models/authorizedUser"


export enum AuthActionTypes {
  CHECK_TOKEN = '[AUTH] CHECK_TOKEN',
  CHECK_TOKEN_SUCCESS = '[AUTH] CHECK_TOKEN_SUCCESS',
  CHECK_TOKEN_FAILURE = '[AUTH] CHECK_TOKEN_FAILURE',
  TRY_LOGIN = '[AUTH] TRY_LOGIN',
  LOGIN_SUCCESS = '[AUTH] LOGIN_SUCCESS',
  LOGIN_FAILURE = '[AUTH] LOGIN_FAILURE',
  LOGIN_LOGOUT = '[AUTH] LOGOUT',
  INIT_CLIENT = '[AUTH] INIT_CLIENT',
  INIT_CLIENT_SUCCESS = '[AUTH] INIT_CLIENT_SUCCESS',
  SET_CURRENT_USER_INFO = '[AUTH] SET_CURRENT_USER_INFO',
}


export class TryLogin implements Action {
  readonly type = AuthActionTypes.TRY_LOGIN;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
}

export class SetCurrentUserInfo implements Action {
  readonly type = AuthActionTypes.SET_CURRENT_USER_INFO;
  constructor(public user: AuthorizedUser){}
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


export class InitClient implements Action {
  readonly type = AuthActionTypes.INIT_CLIENT;
}

export class InitClientSuccess implements Action {
  readonly type = AuthActionTypes.INIT_CLIENT_SUCCESS;
}

export type AuthActionsType =
  TryLogin |
  CheckToken |
  CheckTokenFailure |
  CheckTokenSuccess |
  LoginSuccess |
  LoginFailure |
  Logout |
  InitClient |
  InitClientSuccess |
  SetCurrentUserInfo

