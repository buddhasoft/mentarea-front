import {LoadersState} from "./loaders.reducer"


export const getGlobalLoaderState = (state: LoadersState): boolean => state.globalLoader;
