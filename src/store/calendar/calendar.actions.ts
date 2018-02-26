import { Action } from '@ngrx/store'

export const FETCH_EVENTS = 'FETCH_EVENTS'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const INIT_CALENDAR = 'INIT_CALENDAR'
export const INIT_CALENDAR_SUCCESS = 'INIT_CALENDAR_SUCCESS'

export class FetchEvents implements Action {
  readonly type = FETCH_EVENTS;
}

export class FetchEventsSuccess implements Action {
  readonly type = FETCH_EVENTS_SUCCESS;
  constructor(public payload: {}){}
}

export class InitCalendar implements Action {
  readonly type = INIT_CALENDAR;
}

export class InitCalendarSuccess implements Action {
  readonly type = INIT_CALENDAR_SUCCESS;
}

export type CalendarActions = FetchEvents | InitCalendar | InitCalendarSuccess | FetchEventsSuccess
