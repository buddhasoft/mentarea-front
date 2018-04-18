import {AuthActionsType, AuthActionTypes} from "./auth.actions"
import {AuthorizedUser} from "../../shared/models/authorizedUser"

export interface AuthState {
  isLoggedIn: boolean,
  loggingIn: boolean,
  authorizedUser: AuthorizedUser
}

const initilalState: AuthState = {
  isLoggedIn: false,
  loggingIn: false,
  authorizedUser: null
}

export function authReducer(state = initilalState, action: AuthActionsType) {
  switch (action.type) {
    case AuthActionTypes.TRY_LOGIN:
      return {...state, loggingIn: true}
    case AuthActionTypes.LOGIN_SUCCESS:
      return {...state, loggingIn: false, isLoggedIn: true}
    case AuthActionTypes.SET_CURRENT_USER_INFO:
      return {...state, authorizedUser: action.user}
    case AuthActionTypes.LOGIN_FAILURE:
      return {...state, loggingIn: false}
    case AuthActionTypes.CHECK_TOKEN_SUCCESS:
      return {...state, isLoggedIn: true}
    case AuthActionTypes.LOGOUT_CONFIRMED:
      return {...state, isLoggedIn: false, authorizedUser: null}
  }
  return state
}
