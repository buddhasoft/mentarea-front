import { Action } from '@ngrx/store'

export const FETCH_EVENTS = 'FETCH_EVENTS'

export class FetchEvents implements Action {
  readonly type = FETCH_EVENTS;
}

export type CalendarActions =
  FetchEvents
