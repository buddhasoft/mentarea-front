import {UsersActions, UsersActionTypes} from "./users.actions"
import {IUser} from "../../shared/interfaces/users.interfaces"
import {createEntityAdapter} from '@ngrx/entity';
import {EntityState} from '@ngrx/entity';

export interface UsersState extends EntityState<IUser> {
  selectedUser: IUser;
}

export const usersAdapter = createEntityAdapter<IUser>();

export const initialState: UsersState = usersAdapter.getInitialState({
  // additional entity state properties
  selectedUser: null
});

export function usersReducer(state: UsersState = initialState, action: UsersActions,): UsersState {
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
    case UsersActionTypes.SET_ACTIVE_USER:
      return {
        ...state,
        selectedUser: action.user,
      };
  }
  return state;
}
