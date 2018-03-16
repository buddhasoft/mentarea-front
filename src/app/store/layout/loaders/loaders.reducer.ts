import {LoadersAction, LoadersActionTypes} from "./loaders.actions"

export interface LoadersState {
  globalLoader: boolean,
}

const initilalState: LoadersState = {
  globalLoader: false,
}

export function loadersReducer(state = initilalState, action: LoadersAction) {
  switch (action.type) {
    case LoadersActionTypes.SHOW_LOADER:
      return {...state, [action.loader]: true}
    case LoadersActionTypes.HIDE_LOADER:
      return {...state, [action.loader]: false}
  }
  return state
}
