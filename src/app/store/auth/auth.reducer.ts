import {Action} from '@ngrx/store'
import {LOGIN_FAILURE, LOGIN_SUCCESS, TRY_LOGIN} from "./auth.actions"
import {Map} from 'immutable'

const initilalState = Map({
  isLoggedIn : false,
  loggingIn : false,
})

export function authReducer(state = initilalState, action: Action) {
  switch (action.type) {
    case TRY_LOGIN:
      return state.set('loggingIn', true);
    case LOGIN_SUCCESS:
      return state.withMutations(state => state.set('loggingIn', false).set('isLoggedIn', true))
    case LOGIN_FAILURE:
      return state.set('loggingIn', false)

  }
  return state
}
