export interface ICalendarEvent {
  id: string,
  start: Date,
  end: Date,
  title: string,
  color: {
    primary: string,
    secondary: string
  }
}


