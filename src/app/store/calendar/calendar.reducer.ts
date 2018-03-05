import {CalendarActions, CalendarActionTypes} from "./calendar.actions"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"
import {createEntityAdapter} from '@ngrx/entity';
import {EntityState} from '@ngrx/entity';

export interface CalendarState extends EntityState<ICalendarEvent> {
}

const calendarAdapter = createEntityAdapter<ICalendarEvent>();

const initialState: CalendarState = calendarAdapter.getInitialState();

export function calendarReducer(state: CalendarState = initialState, action: CalendarActions,): CalendarState {
  switch (action.type) {
    case CalendarActionTypes.ADD_ONE:
      return calendarAdapter.addOne(action.event, state);
    case CalendarActionTypes.ADD_MANY:
      return calendarAdapter.addMany(action.events, state);
    case CalendarActionTypes.UPDATE_ONE:
      return calendarAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);
    case CalendarActionTypes.DELETE_ONE:
      return calendarAdapter.removeOne(action.id, state);
    case CalendarActionTypes.ADD_ALL:
      return calendarAdapter.addAll(action.events, state);
    // case CalendarActionTypes.FETCH_EVENTS_SUCCESS:
    //   return state.set('events', List(action['payload']));
    default:
      return state;
  }
}
