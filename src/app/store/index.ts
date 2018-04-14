import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {routerReducer, RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {UsersEffects} from "./users/users.effects"
import {RouterEffects} from "./router/router.effects"
import {EventsEffects} from "./events/events.effects"
import {AuthEffects} from "./auth/auth.effects"
import {authReducer, AuthState} from "./auth/auth.reducer"
import {eventsReducer, EventsState} from "./events/events.reducer"
import {usersReducer, UsersState} from "./users/users.reducer"
import {EffectsModule} from "@ngrx/effects"
import {RouterStateSnapshot} from "@angular/router"
import {layoutReducer, LayoutState} from './layout';
import {InjectionToken} from "@angular/core"
import {CustomSerializer} from "./router/router.serializer"


const EFFECTS_MODULE = EffectsModule.forRoot([
  UsersEffects,
  RouterEffects,
  EventsEffects,
  AuthEffects
])

export interface AppState {
  router: RouterStateSnapshot,
  auth: AuthState,
  events: EventsState,
  users: UsersState,
  layout: LayoutState
}

export const reducerToken = new InjectionToken<ActionReducerMap<AppState>>('Reducers');

export function getReducers() {
  return {
    router: routerReducer,
    auth: authReducer,
    events: eventsReducer,
    users: usersReducer,
    layout: layoutReducer
  }
}

export const reducerProvider = [
  {provide: reducerToken, useFactory: getReducers}
];

export const customSerializer = [
  {provide: RouterStateSerializer, useClass: CustomSerializer}
  ];


const DEV_TOOLS_MODULE = environment.production ? [] :
  [StoreDevtoolsModule.instrument()];

export const APP_STORE_MODULE = [
  StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
  StoreModule.forRoot(reducerToken),
  EFFECTS_MODULE,
  DEV_TOOLS_MODULE
];
