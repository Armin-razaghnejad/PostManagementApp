import { createAction, props } from "@ngrx/store";
import { Post, Filter } from "../types";

export const filterData = createAction('[Posts] Filer Data', props<Filter>());
export const pageIndexData = createAction('[Posts] Page Index Data', props<{pageIndex:number}>());

export const loadData = createAction('[Posts] Load Data');
export const loadDataSuccess = createAction('[Posts] Load Data Success', props<{ data: ReadonlyArray<Post> }>());
export const loadDataFailure = createAction('[Posts] Load Data Failure', props<{ error: Error }>());

export const addData = createAction('[Posts] Add Data', props<{ data: Post }>());
export const addDataSuccess = createAction('[Posts] Add Data Success', props<{ data: Post }>());
export const addDataFailure = createAction('[Posts] Add Data Failure', props<{ error: Error }>());
