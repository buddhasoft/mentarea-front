import {Action} from '@ngrx/store'
import {LOGIN_FAILURE, LOGIN_SUCCESS, TRY_LOGIN} from "./auth.actions"

export interface AuthState {
  isLoggedIn : boolean,
  loggingIn : boolean,
}

const initilalState: AuthState = {
  isLoggedIn : false,
  loggingIn : false,
}

export function authReducer(state = initilalState, action: Action) {
  switch (action.type) {
    case TRY_LOGIN:
      return {...state, loggingIn: true}
    case LOGIN_SUCCESS:
      return {...state, loggingIn: false, isLoggedIn: true}
    case LOGIN_FAILURE:
      return {...state, loggingIn: false}

  }
  return state
}
