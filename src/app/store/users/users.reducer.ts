import {UsersActions, UsersActionTypes} from "./users.actions"
import {IUser} from "../../shared/interfaces/users.interfaces"
import {createEntityAdapter} from '@ngrx/entity';
import {EntityState} from '@ngrx/entity';

export interface EventsState extends EntityState<IUser> {
}

export const usersAdapter = createEntityAdapter<IUser>();

export const initialState: EventsState = usersAdapter.getInitialState();

export function usersReducer(state: EventsState = initialState, action: UsersActions,): EventsState {
  switch (action.type) {
    case UsersActionTypes.ADD_ONE:
      return usersAdapter.addOne(action.user, state);
    case UsersActionTypes.ADD_MANY:
      return usersAdapter.addMany(action.users, state);
    case UsersActionTypes.UPDATE_ONE:
      return usersAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);
    case UsersActionTypes.DELETE_ONE:
      return usersAdapter.removeOne(action.id, state);
    case UsersActionTypes.ADD_ALL:
      return usersAdapter.addAll(action.users, state);
  }
  return state;
}
