import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from "@ngrx/store";
import { PostsService } from "src/app/services/posts.service";
import { selectAddApiState, selectApiState } from "src/app/states";

@Component({
  selector: 'app-snackbar',
  template: '',
  standalone: true,
  imports: [
    SnackBarComponent
  ],
})
export class SnackBarComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private store: Store, private service: PostsService) { }
  ngOnInit(): void {
    this.store.select(selectApiState).subscribe(res => {
      if (!res.loading && res.message) {
        this.openSnackBar(res.message, false);
      }
    })
    this.store.select(selectAddApiState).subscribe(res => {
      if (!res.loading && res.message) {
        this.openSnackBar(res.message, false);
      }
    })
    this.service.callSnackBar.subscribe(res => {
      if (res) this.openSnackBar(res.message, res.action);
    })
  }
  openSnackBar(message: string, action: boolean) {
    this._snackBar.open(message, 'Close!', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: action ? 'success' : 'fail'
    });
  }
}