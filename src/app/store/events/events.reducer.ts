import {EventsActionsType, EventsActionTypes} from "./events.actions"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"
import {createEntityAdapter} from '@ngrx/entity';
import {EntityState} from '@ngrx/entity';

export interface EventsState extends EntityState<ICalendarEvent> {
  selectedEventId: string;
}

export const eventsAdapter = createEntityAdapter<ICalendarEvent>();

export const initialState: EventsState = eventsAdapter.getInitialState({
  selectedEventId: null
})

export function eventsReducer(state: EventsState = initialState, action: EventsActionsType,): EventsState {
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
    case EventsActionTypes.SELECT_EVENT_TO_EDIT:
      return {...state, selectedEventId: action.id };
    case EventsActionTypes.ADD_ALL:
      return eventsAdapter.addAll(action.events, state);
  }
  return state;
}
