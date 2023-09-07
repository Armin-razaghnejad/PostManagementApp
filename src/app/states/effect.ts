import { Injectable } from "@angular/core";
import { map, catchError, switchMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addData, addDataFailure, addDataSuccess, loadData, loadDataFailure, loadDataSuccess, } from "../states/actions";
import { PostsService } from "../services/posts.service";
import { Post } from "../types";

@Injectable()
export class PostEffects {
  constructor(private actions: Actions, private service: PostsService) { }

  myEffect = createEffect(() => {
    return this.actions.pipe(
      ofType(loadData),
      switchMap(() =>
        this.service.getPosts().pipe(
          map(data => loadDataSuccess({ data })),
          catchError(error => of(loadDataFailure({ error })))
        )
      )
    )
  }
  );

  addPostEffect = createEffect(() => {
    return this.actions.pipe(
      ofType(addData),
      switchMap(({ data }) =>
        this.service.addNewPosts(data).pipe(
          map(data => addDataSuccess({data})),
          catchError(error => of(addDataFailure({ error })))
        )
      )
    )
  }
  );


}