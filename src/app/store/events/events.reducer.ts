import {EventsActions, EventsActionTypes} from "./events.actions"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"
import {createEntityAdapter} from '@ngrx/entity';
import {EntityState} from '@ngrx/entity';

export interface EventsState extends EntityState<ICalendarEvent> {
}

const eventsAdapter = createEntityAdapter<ICalendarEvent>();

const initialState: EventsState = eventsAdapter.getInitialState();

export function eventsReducer(state: EventsState = initialState, action: EventsActions,): EventsState {
  switch (action.type) {
    case EventsActionTypes.ADD_ONE:
      return eventsAdapter.addOne(action.event, state);
    case EventsActionTypes.ADD_MANY:
      return eventsAdapter.addMany(action.events, state);
    case EventsActionTypes.UPDATE_ONE:
      return eventsAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);
    case EventsActionTypes.DELETE_ONE:
      return eventsAdapter.removeOne(action.id, state);
    case EventsActionTypes.ADD_ALL:
      return eventsAdapter.addAll(action.events, state);
  }
  return state;
}
