import {Action} from '@ngrx/store'

// import {calendar} from '../../shared/models/calendar.model'

const initilalState = {
}

export function calendarReducer(state = initilalState, action: Action) {
  switch (action.type) {
    case null: console.log('initial state ',); break
  }
  return state
}
