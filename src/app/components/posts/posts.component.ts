import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { selectActivePage, selectApiState, selectFilters, selectPageSize, selectPosts } from 'src/app/states/selectors';
import { PaginationComponent } from '../pagination/pagination.component';
import { filterData, loadData, loadDataSuccess, pageIndexData } from 'src/app/states/actions';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [
    NgFor,
    MatIconModule,
    RouterLink,
    NgIf,
    StoreModule,
    AsyncPipe,
    PaginationComponent,
    LoadingComponent
  ],
})
export class PostsComponent {
  
  posts = this.store.select(selectPosts);
  pageSize = this.store.select(selectPageSize);
  filters = this.store.select(selectFilters);
  activePage = this.store.select(selectActivePage);
  isLoading = this.store.select(selectApiState);

  constructor(private store: Store) { }
  changePage(e: number) {
    console.log(e);
    
    this.store.dispatch(pageIndexData({
      pageIndex: e
    }))
  }
}
