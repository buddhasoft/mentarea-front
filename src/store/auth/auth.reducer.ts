import {Action} from '@ngrx/store'
import {LOGIN_FAILURE, LOGIN_SUCCESS, TRY_LOGIN} from "./auth.actions"
import {Map} from 'immutable'

// import {calendar} from '../../shared/models/calendar.model'

const initilalState = Map({
  isLoggedIn : false,
  loggingIn : false,
})

export function authReducer(state = initilalState, action: Action) {
  switch (action.type) {
    case TRY_LOGIN:
      return state.set('loggingIn', true);
      break;
    case LOGIN_SUCCESS:
      return;
      break;
    case LOGIN_FAILURE:
      return;
      break;

  }
  return state
}
