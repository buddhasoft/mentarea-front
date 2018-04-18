import * as fromUsers from './users.reducer';

export const getActiveUser = (state: fromUsers.UsersState) => state.selectedUser
