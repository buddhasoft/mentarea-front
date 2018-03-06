import {UsersActions, UsersActionTypes} from "./users.actions"
import {IUser} from "../../shared/interfaces/users.interfaces"
import {createEntityAdapter} from '@ngrx/entity';
import {EntityState} from '@ngrx/entity';

export interface EventsState extends EntityState<IUser> {
}

export const eventsAdapter = createEntityAdapter<IUser>();

export const initialState: EventsState = eventsAdapter.getInitialState();

export function usersReducer(state: EventsState = initialState, action: UsersActions,): EventsState {
  switch (action.type) {
    case UsersActionTypes.ADD_ONE:
      return eventsAdapter.addOne(action.event, state);
    case UsersActionTypes.ADD_MANY:
      return eventsAdapter.addMany(action.events, state);
    case UsersActionTypes.UPDATE_ONE:
      return eventsAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);
    case UsersActionTypes.DELETE_ONE:
      return eventsAdapter.removeOne(action.id, state);
    case UsersActionTypes.ADD_ALL:
      return eventsAdapter.addAll(action.events, state);
  }
  return state;
}
