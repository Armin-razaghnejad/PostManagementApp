import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import {
  selectActivePage,
  selectApiState,
  selectError,
  selectFilters,
  selectPosts,
  filterData,
  loadData,
  pageIndexData
} from 'src/app/states';
import { PaginationComponent } from '../pagination/pagination.component';
import { LoadingComponent } from '../loading/loading.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FilterDialog } from '../dialog/filter.dialog';

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
    LoadingComponent,
    MatDialogModule,
    KeyValuePipe
  ],
})
export class PostsComponent {

  posts = this.store.select(selectPosts);
  filters = this.store.select(selectFilters);
  activePage = this.store.select(selectActivePage);
  apiState = this.store.select(selectApiState);
  fecthError = this.store.select(selectError);

  constructor(private store: Store, private dialog: MatDialog) { }
  changePage(e: number) {
    this.store.dispatch(pageIndexData({
      pageIndex: e
    }))
  }

  fetchAgain() {
    this.store.dispatch(loadData())
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialog, { data: this.filters });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(filterData(result))
    });
  }
}
