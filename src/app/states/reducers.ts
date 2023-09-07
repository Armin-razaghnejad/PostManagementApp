import { createReducer, on } from "@ngrx/store";
import { addDataSuccess, filterData, loadDataSuccess, pageIndexData } from "./actions";
import { Post, Filter } from "../types";

export const initialState: ReadonlyArray<Post> = [];
export const initialFilterState: Filter = {
  pageSize: 10,
};
export const initialPageState = {
  pageIndex: 1,
};


export const dataReducer = createReducer(
  initialState,
  on(loadDataSuccess, (_state, { data }) => data),
  on(addDataSuccess, (_state, { data }) => [..._state, data])
)

export const filterReducer = createReducer(
  initialFilterState,
  on(filterData, (_state, filter) => filter)
)

export const pageReducer = createReducer(
  initialPageState,
  on(pageIndexData, (_state, page) => page)
)