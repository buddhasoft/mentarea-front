import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';

import * as fromEvents from './events.reducer';

export const reducers: ActionReducerMap<any> = {events: fromEvents.eventsReducer};
export const selectEventsState = createFeatureSelector<fromEvents.EventsState>('events');
export const {selectAll: selectAllEvents} = fromEvents.eventsAdapter.getSelectors(selectEventsState);
