import {Action} from '@ngrx/store'
import {AuthActionTypes} from "./auth.actions"

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
    case AuthActionTypes.TRY_LOGIN:
      return {...state, loggingIn: true}
    case AuthActionTypes.LOGIN_SUCCESS:
      return {...state, loggingIn: false, isLoggedIn: true}
    case AuthActionTypes.LOGIN_FAILURE:
      return {...state, loggingIn: false}
  }
  return state
}
