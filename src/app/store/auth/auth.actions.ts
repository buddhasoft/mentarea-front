import { Action } from '@ngrx/store'

export const CHECK_TOKEN = '[AUTH] CHECK_TOKEN'
export const CHECK_TOKEN_SUCCESS = '[AUTH] CHECK_TOKEN_SUCCESS'
export const CHECK_TOKEN_FAILURE = '[AUTH] CHECK_TOKEN_FAILURE'
export const TRY_LOGIN = '[AUTH] TRY_LOGIN'
export const LOGIN_SUCCESS = '[AUTH] LOGIN_SUCCESS'
export const LOGIN_FAILURE = '[AUTH] LOGIN_FAILURE'

export class TryLogin implements Action {
  readonly type = TRY_LOGIN;
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;
}

export class CheckToken implements Action {
  readonly type = CHECK_TOKEN;
}

export class CheckTokenFailure implements Action {
  readonly type = CHECK_TOKEN_FAILURE;
}

export class CheckTokenSuccess implements Action {
  readonly type = CHECK_TOKEN_SUCCESS;
}

export type AuthActions =
  TryLogin |
  CheckToken |
  CheckTokenFailure |
  CheckTokenSuccess |
  LoginSuccess |
  LoginFailure
