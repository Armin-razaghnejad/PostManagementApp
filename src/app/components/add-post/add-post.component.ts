import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { addData, selectAddApiState } from 'src/app/states';
import { LoadingComponent } from '../loading/loading.component';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    LoadingComponent
  ]
})
export class AddPostComponent {
  loading = false
  addPostForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    body: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(500)])
    // Post Api doesn't have any author name! so i didn't write
  })

  constructor(private store: Store, private router: Router, private service: PostsService) { }

  submit() {
    if(this.addPostForm.invalid) return;
    const values = this.addPostForm.value;
    this.store.dispatch(addData({ data: { title: values.title ?? '', body: values.body ?? '', userId: 11 } }));
    this.store.select(selectAddApiState)
      .subscribe(res => {
        console.log(res);
        this.loading = res.loading;
        if (res.data) {
          this.service.callSnackBar.next({ message: 'New Post Added to List', action: true })
          this.router.navigate(['/'])
        }
      })
  }
}
