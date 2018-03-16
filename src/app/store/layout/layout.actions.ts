import {Action} from '@ngrx/store'

export enum LoadersActionTypes {
  SHOW_LOADER = '[LOADERS] SHOW_LOADER',
  HIDE_LOADER = '[LOADERS] HIDE_LOADER',
}

export class showLoader implements Action {
  readonly type = LoadersActionTypes.SHOW_LOADER;

  constructor(public loader: string) {
  }
}

export class hideLoader implements Action {
  readonly type = LoadersActionTypes.HIDE_LOADER;

  constructor(public loader: string) {
  }
}

export type LoadersActionsType = showLoader | hideLoader
