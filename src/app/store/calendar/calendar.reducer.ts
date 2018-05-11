export interface CalendarState {
  users: UsersState,
  events: EventsState,
}

import {eventsReducer, EventsState} from "./events/events.reducer"
import {usersReducer, UsersState} from "./users/users.reducer"

export const calendarReducer = {
  users: usersReducer,
  events: eventsReducer
}
