import {createFeatureSelector, createSelector} from "@ngrx/store"

import * as fromAuth from './auth.reducer';


export const selectAuthState = createFeatureSelector<fromAuth.AuthState>('auth');

export const selectLoginState = createSelector(selectAuthState, (state: fromAuth.AuthState) => state.isLoggedIn)
