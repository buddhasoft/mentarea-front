import {Action} from '@ngrx/store'
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"
import {NewEvent} from "../../shared/models/newEvent.model"

export enum EventsActionTypes {
  ADD_ONE = '[EVENTS] ADD_ONE',
  UPDATE_ONE = '[EVENTS] UPDATE_ONE',
  DELETE_ONE = '[EVENTS] DELETE_ONE',
  ADD_ALL = '[EVENTS] ADD_ALL',
  ADD_MANY = '[EVENTS] ADD_MANY',
  FETCH_EVENTS = '[EVENTS] FETCH_EVENTS',
  FETCH_EVENTS_SUCCESS = '[EVENTS] FETCH_EVENTS_SUCCESS',
  INIT_CALENDAR = '[EVENTS] INIT_CALENDAR',
  INIT_CALENDAR_SUCCESS = '[EVENTS] INIT_CALENDAR_SUCCESS',
  CREATE_EVENT = '[EVENTS] СREATE_EVENT'
}


export class FetchEvents implements Action {
  readonly type = EventsActionTypes.FETCH_EVENTS;

  constructor(public id: string = 'primary') {
  }
}

export class FetchEventsSuccess implements Action {
  readonly type = EventsActionTypes.FETCH_EVENTS_SUCCESS;
}

export class InitCalendar implements Action {
  readonly type = EventsActionTypes.INIT_CALENDAR;
}

export class InitCalendarSuccess implements Action {
  readonly type = EventsActionTypes.INIT_CALENDAR_SUCCESS;
}


export class AddOne implements Action {
  readonly type = EventsActionTypes.ADD_ONE;

  constructor(public event: ICalendarEvent) {
  }
}

export class addMany implements Action {
  readonly type = EventsActionTypes.ADD_MANY;

  constructor(public events: ICalendarEvent[]) {
  }
}

export class UpdateOne implements Action {
  readonly type = EventsActionTypes.UPDATE_ONE;

  constructor(public id: string,
              public changes: Partial<ICalendarEvent>,) {
  }
}

export class DeleteOne implements Action {
  readonly type = EventsActionTypes.DELETE_ONE;

  constructor(public id: string) {
  }
}

export class AddAll implements Action {
  readonly type = EventsActionTypes.ADD_ALL;

  constructor(public events: ICalendarEvent[]) {
  }
}

export class CreateEvent implements Action {
  readonly type = EventsActionTypes.CREATE_EVENT;

  constructor(public event: NewEvent) {
  }
}


export type EventsActions =
  AddOne |
  addMany |
  UpdateOne |
  DeleteOne |
  AddAll |
  FetchEvents |
  InitCalendar |
  InitCalendarSuccess |
  FetchEventsSuccess |
  CreateEvent
