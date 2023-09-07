import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, skip, switchMap } from 'rxjs';
import { loadDataSuccess } from 'src/app/states/actions';
import { selectPosts } from 'src/app/states/selectors';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ]
})
export class SingleComponent implements OnInit {
  post !: Post;
  postId !: number;
  constructor(route: ActivatedRoute, private router: Router, private store: Store, private actions: Actions) {
    route.params.subscribe(r => {
      if (!r['id']) return router.navigate(['/']);
      return this.postId = r['id'];
    })
  }

  // myEffect = createEffect(() => {
  //   return this.actions.pipe(
  //     ofType(loadDataSuccess),
  //     map(res=>{
  //       console.log(res);
  //       return ''
  //     })
  //   )
  // }
  // );
  ngOnInit(): void {
    this.store.select(selectPosts)
      .subscribe(res => {
        if(!res.length) return;
        const post = res.find(i => i.id == this.postId);
        if (!post) return this.router.navigate(['/']);
        return this.post = post;
      })
    // loadDataSuccess
    // this.store.select(loadDataSuccess).subscribe(res=>{
    //   console.log(res);
    //   const post = res.find(i => i.id == this.postId);
    //   if(!post) return this.router.navigate(['/']);
    //   return this.post = post;
    // })
  }
}
