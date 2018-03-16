import {
  LoadersState,
  loadersReducer
} from './loaders';

import {combineReducers} from "@ngrx/store"

export interface LayoutState {
  loaders: LoadersState,
}

export const layoutReducer = combineReducers({
  loaders: loadersReducer
})
