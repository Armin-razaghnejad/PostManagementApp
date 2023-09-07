import { NgFor } from "@angular/common";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Observable } from "rxjs";

@Component({
  selector: 'paginate',
  template: `
    <ul class="pagination flex gap-2 items-center select-none justify-center">
        <small>total: {{_size}}</small>
        <li class="paginate-items mr-4 pt-0" [class.disabled]="page === 1">
          <button class="disabled:text-slate-300 rounded-full w-6 h-6" (click)="goToPage(page - 1)" [disabled]="page === 1">
            <mat-icon fontIcon="keyboard_arrow_left"></mat-icon>
          </button>
        </li>
        <li class="paginate-items" [class.paginate-item-active]="page === item" *ngFor="let item of getVisiblePages()">
          <button class="page-link cursor-pointer w-full text-sm" (click)="goToPage(item)">{{ item }}</button>
        </li>
        <li class="paginate-items ml-4 pt-0" [class.disabled]="page === _size">
          <button class="disabled:text-slate-300 rounded-full w-6 h-6" (click)="goToPage(page + 1)" [disabled]="page === _size">
            <mat-icon fontIcon="keyboard_arrow_right"></mat-icon>
          </button>
        </li>
      </ul>
  `,
  standalone: true,
  imports: [
    NgFor,
    MatIconModule
  ]
})

export class PaginationComponent {
  pages: number[] = [];
  _size!: number;
  @Input() set size(value: Observable<{pageSize:number}>) {
    value.subscribe(res => {
      this._size = res.pageSize
      this.pages = Array.from({ length: res.pageSize }, (_, index) => { return index + 1 });
    })
  }
  @Input() page = 1;
  @Input() set activePage(value: Observable<{ pageIndex: number } | null>) {
    value.subscribe(res => {
      if (res)
        this.page = res.pageIndex;
    })
  }
  @Output() pageChange = new EventEmitter<number>();
  visiblePages = 5;

  goToPage(page: number) {
    this.page = page;
    this.selectPage(page)
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const start = Math.floor(this.page / this.visiblePages);
    let startPage = start * this.visiblePages;
    let endPage = startPage + this.visiblePages;

    if (startPage <= 0) startPage = 1;
    if (endPage >= this._size) endPage = this._size;

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if(this.page > this._size) this.goToPage(1)

    return pages;
  }

  selectPage(page: number) {
    this.page = page;
    this.pageChange.emit(this.page);
  }

}