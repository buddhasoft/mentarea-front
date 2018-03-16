import {AppState} from "./index"
import * as layout from './layout';

const getLayoutState = (state: AppState) => state.layout;


import {createSelector} from "@ngrx/store"

export const getGlobalLoader = createSelector(getLayoutState, layout.getGlobalLoaderSelector);
