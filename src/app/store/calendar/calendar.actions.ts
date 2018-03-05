import { Action } from '@ngrx/store'
import {CalendarEvent} from "./calendar.interfaces"

export enum
CalendarActionTypes
{
  ADD_ONE = '[Events] Add One',
  UPDATE_ONE = '[Events] Update One',
  DELETE_ONE = '[Events] Delete One',
  ADD_ALL = '[Events] Add All',
  ADD_MANY = '[Events] Add Many',
  FETCH_EVENTS = 'FETCH_EVENTS',
  FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS',
  INIT_CALENDAR = 'INIT_CALENDAR',
  INIT_CALENDAR_SUCCESS = 'INIT_CALENDAR_SUCCESS'
}


export class FetchEvents implements Action {
  readonly type = CalendarActionTypes.FETCH_EVENTS;
}

export class FetchEventsSuccess implements Action {
  readonly type = CalendarActionTypes.FETCH_EVENTS_SUCCESS;
}

export class InitCalendar implements Action {
  readonly type = CalendarActionTypes.INIT_CALENDAR;
}

export class InitCalendarSuccess implements Action {
  readonly type = CalendarActionTypes.INIT_CALENDAR_SUCCESS;
}

export class AddOne implements Action {
  readonly type = CalendarActionTypes.ADD_ONE;

  constructor(public event: CalendarEvent) {}
}

export class addMany implements Action {
  readonly type = CalendarActionTypes.ADD_MANY;

  constructor(public events: CalendarEvent[]) {}
}

export class UpdateOne implements Action {
  readonly type = CalendarActionTypes.UPDATE_ONE;

  constructor(public id: string,
              public changes: Partial<CalendarEvent>,
  ) {}
}

export class DeleteOne implements Action {
  readonly type = CalendarActionTypes.DELETE_ONE;

  constructor(public id: string) {}
}

export class AddAll implements Action {
  readonly type = CalendarActionTypes.ADD_ALL;

  constructor(public events: CalendarEvent[]) {}
}



export type CalendarActions =
  AddOne |
  addMany |
  UpdateOne |
  DeleteOne |
  AddAll |
  FetchEvents |
  InitCalendar |
  InitCalendarSuccess |
  FetchEventsSuccess
