import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';

import * as fromUsers from './users.reducer';

export const reducers: ActionReducerMap<any> = {events: fromUsers.usersReducer};
export const selectUsersState = createFeatureSelector<fromUsers.EventsState>('users');
export const {selectAll: selectAllUsers} = fromUsers.usersAdapter.getSelectors(selectUsersState);
