import {ICalendarEvent} from "./calendar.interfaces"

const PRIMARY_COLOR = '#3ee0c666'
const SECONDARY_COLOR = '#3ee0c666'

export class CalendarEvent implements ICalendarEvent {
  public id: string
  public start: Date
  public end: Date
  public title: string
  public color: {
    primary: string,
    secondary: string
  }

  constructor(event) {
    this.id = event.id
    this.start = new Date(event.start.dateTime)
    this.end = new Date(event.end.dateTime)
    this.title = event.summary
    this.color = {
      primary: PRIMARY_COLOR,
      secondary: SECONDARY_COLOR
    }
  }
}
