import * as fromEvents from './events.reducer';
import {ICalendarEvent} from "../../../shared/interfaces/calendar.interfaces"

export const getActiveEvent = (state: fromEvents.EventsState): ICalendarEvent => {
  return state.entities[state.selectedEventId]
}


