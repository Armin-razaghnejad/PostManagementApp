import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post, Filter } from "../types";

export const selectPost = createFeatureSelector<ReadonlyArray<Post>>('posts');
export const selectFilerPost = createFeatureSelector<Filter>('filter');
export const selectPageIndexPost = createFeatureSelector<{pageIndex: number}>('page');

export const selectPosts = createSelector(
  selectPost,
  selectFilerPost,
  selectPageIndexPost,
  (posts, filter, {pageIndex}) => {
    const startIndex = (pageIndex - 1) * filter.pageSize;    
    return posts.slice(startIndex, startIndex + filter.pageSize);
  }
);

export const selectPageSize = createSelector(
  selectPost,
  selectFilerPost,
  (posts,filter) => posts.length / filter.pageSize
);

export const selectFilters = createSelector(
  selectFilerPost,
  (filters) => filters
);

export const selectActivePage = createSelector(
  selectPageIndexPost,
  (page) => page
);


