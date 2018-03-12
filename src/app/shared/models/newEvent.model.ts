import {IUser} from "../interfaces/users.interfaces"

const PRIMARY_COLOR = '#3ee0c666'
const SECONDARY_COLOR = '#3ee0c666'

const defaultEvent = {
  "start": {
    "dateTime": new Date(),
    "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
  },
  "end": {
    "dateTime": new Date(),
    "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
  },
  "title": '',
  "attendees": []
}

export class NewEvent {
  public start: Date
  public end: Date
  public attendee: IUser[]
  public title: string
  public color: {
    primary: string,
    secondary: string
  }
  public resizable: {
    beforeStart: boolean,
    afterEnd: boolean
  }
  public draggable: boolean

  constructor(event = defaultEvent) {
    this.start = new Date(event.start.dateTime)
    this.end = new Date(event.end.dateTime)
    this.title = event.title

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
