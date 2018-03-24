import {AppState} from "./index"
import * as layout from './layout';
import * as fromEvents from './events';
import * as fromUsers from './users';
import * as fromAuth from './auth';

const getLayoutState = (state: AppState) => state.layout;


import {createSelector} from "@ngrx/store"
import {ICalendarEvent} from "../shared/interfaces/calendar.interfaces"
import {AuthorizedUser} from "../shared/models/authorizedUser"

export const getGlobalLoader = createSelector(getLayoutState, layout.getGlobalLoaderSelector);

export const authUserEventsFromGroup = createSelector(
  fromEvents.selectAllEvents,
  fromAuth.selectAuthorizedUser,
  (allEvents: ICalendarEvent[], authUser: AuthorizedUser): ICalendarEvent[] => {
    return allEvents
      .filter(event => {
        if(!event.attendees) return false
        return event.attendees.filter(attendee => attendee.email === authUser.email).length !== 0
      })
      .map(event => ({
        ...event,
        responseStatus: event.attendees.filter(
          attendee => attendee.email === authUser.email
        )[0].responseStatus
      }))
  }
)
