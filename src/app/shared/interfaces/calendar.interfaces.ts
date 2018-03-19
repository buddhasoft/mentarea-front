import {IAttendee} from "./users.interfaces"

export interface ICalendarEvent {
  id: string,
  start: Date,
  end: Date,
  title: string,
  hangoutLink: string,
  attendees: IAttendee[],
  color: {
    primary: string,
    secondary: string
  },
  resizable: {
          beforeStart: boolean,
          afterEnd: boolean
        },
  draggable: boolean
}


