import {StoreModule} from '@ngrx/store';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
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


const EFFECTS_MODULE = EffectsModule.forRoot([
  UsersEffects,
  RouterEffects,
  EventsEffects,
  AuthEffects
])

const STORE_MODULE = StoreModule.forRoot({
  router: routerReducer,
  auth: authReducer,
  events: eventsReducer,
  users: usersReducer
})

export interface AppState {
  router: RouterStateSnapshot,
  auth: AuthState,
  events: EventsState,
  users: UsersState
}


const DEV_TOOLS_MODULE = environment.production ? [] :
  [StoreDevtoolsModule.instrument()];

export const APP_STORE_MODULE = [
  StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
  STORE_MODULE,
  EFFECTS_MODULE,
  DEV_TOOLS_MODULE
];

// export * from './seedbox-plans';
// export * from './store';
// export * from './selectors'
// export * from './layout';
// export * from './dashboard';
