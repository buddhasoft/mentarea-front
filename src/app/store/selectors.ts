import {AppState} from "./index"
import * as layout from './layout';
import * as calendar from './calendar';
import * as fromAuth from './auth';

const getLayoutState = (state: AppState) => state.layout;
const getCalendarState = (state: AppState) => state.calendar;


import {createSelector} from "@ngrx/store"
import {ICalendarEvent} from "../shared/interfaces/calendar.interfaces"
import {AuthorizedUser} from "../shared/models/authorizedUser"

export const getGlobalLoader = createSelector(getLayoutState, layout.getGlobalLoaderSelector);

/*USERS SELECTORS*/
export const getActiveUser = createSelector(getCalendarState, calendar.getActiveUserSelector);
export const getAllUsers = createSelector(getCalendarState, calendar.allUsersSelector);

/*EVENTS SELECTORS*/
export const getActiveEvent = createSelector(getCalendarState, calendar.activeEventSelector);
export const getAllEvents = createSelector(getCalendarState, calendar.allEventsSelector);
export const getEventsTotal = createSelector(getCalendarState, calendar.eventsTotalSelector);

export const authUserEventsFromGroup = createSelector(
  getAllEvents,
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
