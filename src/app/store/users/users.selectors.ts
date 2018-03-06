import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';

import * as fromUsers from './users.reducer';

export const reducers: ActionReducerMap<any> = {events: fromUsers.eventsReducer};
export const selectUsersState = createFeatureSelector<fromUsers.EventsState>('events');
export const {selectAll: selectAllEvents} = fromUsers.eventsAdapter.getSelectors(selectUsersState);
