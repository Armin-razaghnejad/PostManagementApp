import { provideHttpClient } from '@angular/common/http';
import { Route } from '@angular/router';
import { PostsService } from './services/posts.service';

export const APP_ROUTE: Route[] = [
  {
    path: '', pathMatch: 'full', title: 'Posts', loadComponent: () => import('./components/posts/posts.component').then(c => c.PostsComponent),
    providers: [
      provideHttpClient(),
      PostsService
    ]
  },
  {
    path: 'add', title: 'Add New Post', loadComponent: () => import('./components/add-post/add-post.component').then(c => c.AddPostComponent),
  },
  {
    path: ':id', title: 'Single Post', loadComponent: () => import('./components/single/single.component').then(c => c.SingleComponent),
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
