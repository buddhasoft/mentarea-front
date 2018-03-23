import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';

import * as fromEvents from './events.reducer';
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"

export const reducers: ActionReducerMap<any> = {events: fromEvents.eventsReducer};
export const selectEventsState = createFeatureSelector<fromEvents.EventsState>('events');
export const {selectAll: selectAllEvents} = fromEvents.eventsAdapter.getSelectors(selectEventsState);
export const getSelectedEvent = createSelector(
  selectEventsState,
  (state: fromEvents.EventsState): ICalendarEvent => {
    return state.entities[state.selectedEventId]
  }
)

