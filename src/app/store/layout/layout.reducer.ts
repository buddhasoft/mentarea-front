import {
  LoadersState,
  loadersReducer
} from './loaders'
  ;
export interface LayoutState {
  loaders: LoadersState,
}

export const layoutReducer = {
  loaders: loadersReducer
}
