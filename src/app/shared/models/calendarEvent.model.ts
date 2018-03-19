import {ICalendarEvent} from "../interfaces/calendar.interfaces"

const PRIMARY_COLOR = '#3ee0c666'
const SECONDARY_COLOR = '#3ee0c666'

export class CalendarEvent implements ICalendarEvent {
  public id: string
  public start: Date
  public end: Date
  public title: string
  public hangoutLink: string
  public color: {
    primary: string,
    secondary: string
  }
  public resizable: {
    beforeStart: boolean,
    afterEnd: boolean
  }
  public draggable: boolean

  constructor(event) {
    this.id = event.id
    this.start = new Date(event.start.dateTime)
    this.end = new Date(event.end.dateTime)
    this.title = event.summary
    this.hangoutLink = event.hangoutLink

    this.color = {
      primary: PRIMARY_COLOR,
      secondary: SECONDARY_COLOR
    }

    this.resizable = {
      beforeStart: true,
      afterEnd: true,
    }

    this.draggable = true
  }
}
