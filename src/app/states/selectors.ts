import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post, Filter, StatePost } from "../types";

export const selectPost = createFeatureSelector<StatePost>('posts');
export const selectFilerPost = createFeatureSelector<Filter>('filter');
export const selectPageIndexPost = createFeatureSelector<{pageIndex: number}>('page');

export const selectPosts = createSelector(
  selectPost,
  selectFilerPost,
  selectPageIndexPost,
  (state, filter, {pageIndex}) => {
    console.log(state);
    
    const startIndex = (pageIndex - 1) * filter.pageSize;    
    return state.data.slice(startIndex, startIndex + filter.pageSize);
  }
);

export const selectApiState = createSelector(
  selectPost,
  (state)=> state.loading
)

export const selectPageSize = createSelector(
  selectPost,
  selectFilerPost,
  (posts,filter) => posts.data.length / filter.pageSize
);

export const selectFilters = createSelector(
  selectFilerPost,
  (filters) => filters
);

export const selectActivePage = createSelector(
  selectPageIndexPost,
  (page) => page
);


