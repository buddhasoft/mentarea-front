import {AppState} from "./index"
import * as layout from './layout';
import * as fromEvents from './events';
import * as fromUsers from './users';

const getLayoutState = (state: AppState) => state.layout;


import {createSelector} from "@ngrx/store"
import {ICalendarEvent} from "../shared/interfaces/calendar.interfaces"
import {IUser} from "../shared/interfaces/users.interfaces"

export const getGlobalLoader = createSelector(getLayoutState, layout.getGlobalLoaderSelector);

export const authorizedUserEvents = createSelector(
  fromEvents.selectAllEvents,
  fromUsers.selectActiveUser,
  (allEvents: ICalendarEvent[], activeUser: IUser): ICalendarEvent[] => {
    return allEvents
      .filter(event => {
        return event.attendees.filter(attendee => attendee.email === activeUser.id).length !== 0
      }).map(event => ({
        ...event,
        responseStatus: event.attendees.filter(
          attendee => attendee.email === activeUser.id
        )[0].responseStatus
      }))
  }
)
