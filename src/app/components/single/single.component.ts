import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectPosts } from 'src/app/states/selectors';
import { Post } from 'src/app/types/post';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe,
    LoadingComponent
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

  ngOnInit(): void {
    this.store.select(selectPosts)
      .subscribe(res => {
        if(!res.data.length) return;
        const post = res.data.find(i => i.id == this.postId);
        if (!post) return this.router.navigate(['/']);
        return this.post = post;
      })
  }
}
