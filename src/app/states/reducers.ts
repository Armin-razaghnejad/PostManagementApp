import { createReducer, on } from "@ngrx/store";
import { addDataSuccess, filterData, loadData, loadDataFailure, loadDataSuccess, pageIndexData } from "./actions";
import { Post, Filter, StatePost } from "../types";

const initialState: StatePost = { loading: true, data: [] };
const initialFilterState: Filter = {
  pageSize: 10,
};
const initialPageState = {
  pageIndex: 1,
};

export const dataReducer = createReducer(
  initialState,
  on(loadData, (state) => ({ ...state, loading: true })),
  on(loadDataSuccess, (_state, { data }) => ({ data, loading: false })),
  on(addDataSuccess, (_state, { data }) => ({ data: [..._state.data, data], loading: false })),
  on(loadDataFailure, (_state, { error }) => ({ data: _state.data, message: error.message, loading: false })),
)

export const filterReducer = createReducer(
  initialFilterState,
  on(filterData, (_state, filter) => filter)
)

export const pageReducer = createReducer(
  initialPageState,
  on(pageIndexData, (_state, page) => page)
)