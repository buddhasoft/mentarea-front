import { Action } from '@ngrx/store'
import {IUser} from "../../../shared/interfaces/users.interfaces"

export enum
UsersActionTypes
{
  ADD_ONE = '[USERS] ADD_ONE',
  UPDATE_ONE = '[USERS] UPDATE_ONE',
  DELETE_ONE = '[USERS] DELETE_ONE',
  ADD_ALL = '[USERS] ADD_ALL',
  ADD_MANY = '[USERS] ADD_MANY',
  FETCH_USERS = '[USERS] FETCH_USERS',
  FETCH_USERS_SUCCESS = '[USERS] FETCH_USERS_SUCCESS',
  SET_ACTIVE_USER = '[USERS] SET_ACTIVE_USER',
}

export class FetchUsers implements Action {
  readonly type = UsersActionTypes.FETCH_USERS;
}

export class FetchUsersSuccess implements Action {
  readonly type = UsersActionTypes.FETCH_USERS_SUCCESS;
}

export class AddOneUser implements Action {
  readonly type = UsersActionTypes.ADD_ONE;

  constructor(public user: IUser) {}
}

export class addManyUsers implements Action {
  readonly type = UsersActionTypes.ADD_MANY;

  constructor(public users: IUser[]) {}
}

export class UpdateOneUser implements Action {
  readonly type = UsersActionTypes.UPDATE_ONE;

  constructor(public id: string,
              public changes: Partial<IUser>,
  ) {}
}

export class DeleteOneUser implements Action {
  readonly type = UsersActionTypes.DELETE_ONE;

  constructor(public id: string) {}
}

export class AddAllUsers implements Action {
  readonly type = UsersActionTypes.ADD_ALL;

  constructor(public users: IUser[]) {}
}

export class SetActiveUser implements Action {
  readonly type = UsersActionTypes.SET_ACTIVE_USER;

  constructor(public user: IUser) {}
}



export type UsersActions =
  AddOneUser |
  addManyUsers |
  UpdateOneUser |
  DeleteOneUser |
  AddAllUsers |
  SetActiveUser
