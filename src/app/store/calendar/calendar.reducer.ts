import {Action} from '@ngrx/store'
import {List, Map} from 'immutable'
import {FETCH_EVENTS_SUCCESS} from "./calendar.actions"
// import {calendar} from '../../shared/models/calendar.model'

const initilalState = Map({
  events: List([])
})

export function calendarReducer(state = initilalState, action: Action) {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return state.set('events', List(action['payload']));
  }
  return state
}
