import { Action } from '@ngrx/store'
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"

export enum
CalendarActionTypes
{
  ADD_ONE = '[CALENDAR] ADD_ONE',
  UPDATE_ONE = '[CALENDAR] UPDATE_ONE',
  DELETE_ONE = '[CALENDAR] DELETE_ONE',
  ADD_ALL = '[CALENDAR] ADD_ALL',
  ADD_MANY = '[CALENDAR] ADD_MANY',
  FETCH_EVENTS = '[CALENDAR] FETCH_EVENTS',
  FETCH_EVENTS_SUCCESS = '[CALENDAR] FETCH_EVENTS_SUCCESS',
  INIT_CALENDAR = '[CALENDAR] INIT_CALENDAR',
  INIT_CALENDAR_SUCCESS = '[CALENDAR] INIT_CALENDAR_SUCCESS'
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

  constructor(public event: ICalendarEvent) {}
}

export class addMany implements Action {
  readonly type = CalendarActionTypes.ADD_MANY;

  constructor(public events: ICalendarEvent[]) {}
}

export class UpdateOne implements Action {
  readonly type = CalendarActionTypes.UPDATE_ONE;

  constructor(public id: string,
              public changes: Partial<ICalendarEvent>,
  ) {}
}

export class DeleteOne implements Action {
  readonly type = CalendarActionTypes.DELETE_ONE;

  constructor(public id: string) {}
}

export class AddAll implements Action {
  readonly type = CalendarActionTypes.ADD_ALL;

  constructor(public events: ICalendarEvent[]) {}
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
