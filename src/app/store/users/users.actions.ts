import { Action } from '@ngrx/store'
import {IUser} from "../../shared/interfaces/users.interfaces"

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
  INIT_CALENDAR = '[USERS] INIT_CALENDAR',
  INIT_CALENDAR_SUCCESS = '[USERS] INIT_CALENDAR_SUCCESS'
}


export class FetchUsers implements Action {
  readonly type = UsersActionTypes.FETCH_USERS;
}

export class FetchUsersSuccess implements Action {
  readonly type = UsersActionTypes.FETCH_EVENTS_SUCCESS;
}

export class AddOne implements Action {
  readonly type = UsersActionTypes.ADD_ONE;

  constructor(public event: IUser) {}
}

export class addMany implements Action {
  readonly type = UsersActionTypes.ADD_MANY;

  constructor(public events: IUser[]) {}
}

export class UpdateOne implements Action {
  readonly type = UsersActionTypes.UPDATE_ONE;

  constructor(public id: string,
              public changes: Partial<IUser>,
  ) {}
}

export class DeleteOne implements Action {
  readonly type = UsersActionTypes.DELETE_ONE;

  constructor(public id: string) {}
}

export class AddAll implements Action {
  readonly type = UsersActionTypes.ADD_ALL;

  constructor(public events: IUser[]) {}
}



export type UsersActions =
  AddOne |
  addMany |
  UpdateOne |
  DeleteOne |
  AddAll |
  FetchUsers |
  FetchUsersSuccess
