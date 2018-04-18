export interface CalendarState {
  users: UsersState,
  events: EventsState,
}

import {combineReducers} from "@ngrx/store"
import {eventsReducer, EventsState} from "./events/events.reducer"
import {usersReducer, UsersState} from "./users/users.reducer"

export const calendarReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer
})
