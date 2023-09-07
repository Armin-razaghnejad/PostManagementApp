import { Injectable } from "@angular/core";
import { map, catchError, switchMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadData, loadDataFailure, loadDataSuccess, } from "../states/actions";
import { PostsService } from "../services/posts.service";

@Injectable()
export class PostEffects {
  constructor(private actions: Actions, private service: PostsService) { }


  // posteffect = createEffect(() => {
  //   return this.actions.pipe(
  //     ofType(postsActions.retrievedPostList),
  //     mergeMap(
  //       () => this.service.getPosts()
  //         .pipe(
  //           map(posts => ({ type: '[Post API] Posts Loaded Success', payload: posts })),
  //           catchError(() => EMPTY)
  //         )
  //     )
  //   );
  // })

  myEffect = createEffect(() => {
    return this.actions.pipe(
      ofType(loadData), // Replace with your action
      switchMap(() =>
        this.service.getPosts().pipe(
          map(data => loadDataSuccess({ data })), // Replace with your action
          catchError(error => of(loadDataFailure({ error }))) // Replace with your action
        )
      )
    )
  }
  );


}