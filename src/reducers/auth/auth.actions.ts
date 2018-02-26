import { Action } from '@ngrx/store'

export const TRY_LOGIN = 'TRY_LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export class TryLogin implements Action {
  readonly type = TRY_LOGIN;
}
