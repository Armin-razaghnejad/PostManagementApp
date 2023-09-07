import { Injectable } from "@angular/core";
import { map, catchError, switchMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadData, loadDataFailure, loadDataSuccess, } from "../states/actions";
import { PostsService } from "../services/posts.service";

@Injectable()
export class PostEffects {
  constructor(private actions: Actions, private service: PostsService) { }

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