import {Action} from '@ngrx/store'

export interface LoadersAction extends Action {
  loader: string
}

export enum LoadersActionTypes {
  SHOW_LOADER = '[LOADERS] SHOW_LOADER',
  HIDE_LOADER = '[LOADERS] HIDE_LOADER',
}

export class showLoader implements LoadersAction {
  readonly type = LoadersActionTypes.SHOW_LOADER;

  constructor(public loader: string) {
  }
}


export class hideLoader implements LoadersAction {
  readonly type = LoadersActionTypes.HIDE_LOADER;

  constructor(public loader: string) {
  }
}

export type LoadersActionsType = showLoader | hideLoader
