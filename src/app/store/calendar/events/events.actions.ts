import {Action} from '@ngrx/store'
import {ICalendarEvent} from "../../../shared/interfaces/calendar.interfaces"
import {AppCalendarEvent} from "../../../shared/models/newEvent.model"

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
  CREATE_EVENT = '[EVENTS] СREATE_EVENT',
  UPDATE_EVENT = '[EVENTS] UPDATE_EVENT',
  SELECT_EVENT_TO_EDIT = '[EVENTS] SELECT_EVENT_TO_EDIT'
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


export class AddOneEvent implements Action {
  readonly type = EventsActionTypes.ADD_ONE;

  constructor(public event: ICalendarEvent) {
  }
}

export class addManyEvents implements Action {
  readonly type = EventsActionTypes.ADD_MANY;

  constructor(public events: ICalendarEvent[]) {
  }
}

export class UpdateOneEvent implements Action {
  readonly type = EventsActionTypes.UPDATE_ONE;

  constructor(public id: string,
              public changes: Partial<ICalendarEvent>,) {
  }
}

export class DeleteOneEvent implements Action {
  readonly type = EventsActionTypes.DELETE_ONE;

  constructor(public id: string) {
  }
}

export class AddAllEvents implements Action {
  readonly type = EventsActionTypes.ADD_ALL;

  constructor(public events: ICalendarEvent[]) {
  }
}

export class CreateEvent implements Action {
  readonly type = EventsActionTypes.CREATE_EVENT;

  constructor(public event: AppCalendarEvent) {
  }
}

export class UpdateEvent implements Action {
  readonly type = EventsActionTypes.UPDATE_EVENT;

  constructor(public event: AppCalendarEvent) {
  }
}

export class SelectEventToEdit implements Action {
  readonly type = EventsActionTypes.SELECT_EVENT_TO_EDIT;

  constructor(public id: string | null) {
  }
}


export type EventsActionsType =
  AddOneEvent |
  addManyEvents |
  UpdateOneEvent |
  DeleteOneEvent |
  AddAllEvents |
  FetchEvents |
  InitCalendar |
  InitCalendarSuccess |
  FetchEventsSuccess |
  CreateEvent |
  SelectEventToEdit |
  UpdateEvent
