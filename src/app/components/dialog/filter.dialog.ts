import { NgFor, NgIf } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatSelectModule } from '@angular/material/select';
import { Observable } from "rxjs";
import { Filter } from "src/app/types";

@Component({
  template: `
    <div class="bg-white p-6 rounded-md sm:w-96 w-full">
      <form [formGroup]="filterForm" class="flex flex-col gap-4" (ngSubmit)="submit()">
        <div class="relative">
          <ng-template [ngIf]="filterForm.controls.search.touched && filterForm.controls.search.invalid">
            <small class="text-rose-500 absolute top-2 right-2">Title is Invalid</small>
          </ng-template>
          <label for="title" class="block mb-2">Search:</label>
          <input formControlName="search" placeholder="Search in Titles" class="text-sm h-10 w-full px-4" maxlength="30">
        </div>
        <div class="relative">
          <ng-template [ngIf]="filterForm.controls.pageSize.touched && filterForm.controls.pageSize.invalid">
            <small class="text-rose-500 absolute top-2 right-2">Title is Invalid</small>
          </ng-template>
          <label for="title" class="block mb-2">Paginate Size:</label>
          <input formControlName="pageSize" type="number" max="50" min="2" placeholder="Write Post Title" class="text-sm h-10 w-full px-4" maxlength="30">
        </div>
        <div class="relative mt-4">
          <mat-form-field class="w-full">
            <mat-label>Sort Title</mat-label>
            <mat-select formControlName="sort">
              <mat-option *ngFor="let item of sortItems" [value]="item.value">
                {{item.viewValue}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <button [disabled]="filterForm.invalid" class="bg-blue-500 hover:bg-blue-600 w-36 mx-auto text-white leading-10">Filter</button>
      </form>
    </div>
  `,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgIf,
    NgFor,
    MatDialogModule,
  ]
})
export class FilterDialog {
  sortItems = [
    { value: 0, viewValue: 'Default' },
    { value: 1, viewValue: 'A-Z' },
    { value: 2, viewValue: 'Z-A' },
  ];
  filterForm = new FormGroup({
    search: new FormControl('', Validators.maxLength(50)),
    sort: new FormControl(0),
    pageSize: new FormControl(10, [Validators.required, Validators.min(2), Validators.max(50)]),
    // Post Api doesn't have any Author, so i didn't write
  })

  constructor(
    public dialogRef: MatDialogRef<FilterDialog>,
    @Inject(MAT_DIALOG_DATA) data: Observable<Filter>,
  ) {
    data.subscribe(res => {
      this.filterForm.patchValue({
        search: res.search,
        sort: res.sort,
        pageSize: res.pageSize
      })
    })
  }

  submit() {
    if(this.filterForm.invalid) return;
    this.dialogRef.close(this.filterForm.value)
  }
} 