import {CalendarState} from "./calendar.reducer"
import {createSelector} from "@ngrx/store"
import * as fromUsers from "./users"
import * as fromEvents from "./events"

export const getUsersState = (state: CalendarState) => state.users;
export const getEventsState = (state: CalendarState) => state.events;



export const {selectAll: allUsersSelector} = fromUsers.usersAdapter.getSelectors(getUsersState);
export const getActiveUserSelector = createSelector(getUsersState, fromUsers.getActiveUser);


export const {
  selectAll: allEventsSelector,
  selectTotal: eventsTotalSelector
} = fromEvents.eventsAdapter.getSelectors(getEventsState);

export const activeEventSelector = createSelector(getEventsState, fromEvents.getActiveEvent)
