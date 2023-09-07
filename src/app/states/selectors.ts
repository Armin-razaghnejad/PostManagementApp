import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Filter, StatePost } from "../types";

export const selectPost = createFeatureSelector<StatePost>('posts');
export const selectFilerPost = createFeatureSelector<Filter>('filter');
export const selectPageIndexPost = createFeatureSelector<{ pageIndex: number }>('page');

export const selectPosts = createSelector(
  selectPost,
  selectFilerPost,
  selectPageIndexPost,
  (state, filter, { pageIndex }) => {
    const startIndex = (pageIndex - 1) * filter.pageSize;
    let data = state.data;
    if (filter.search)
      data = data.filter(item => item.title.includes(filter.search ?? ''));
    if(filter.sort === 1)
      data = data.slice().sort((a, b) => a.title.localeCompare(b.title));
    if(filter.sort === 2)
      data = data.slice().sort((a, b) => b.title.localeCompare(a.title));
    return {data:data.slice(startIndex, startIndex + filter.pageSize),pageSize: Math.ceil(data.length / filter.pageSize)};
  }
);

export const selectApiState = createSelector(
  selectPost,
  (state) => state.loading
)

export const selectError = createSelector(
  selectPost,
  (state) => {
    if (!state.data.length && state.message) return state.message;
    return null;
  }
)

export const selectFilters = createSelector(
  selectFilerPost,
  (filters) => filters
);

export const selectActivePage = createSelector(
  selectPageIndexPost,
  (page) => page
);


