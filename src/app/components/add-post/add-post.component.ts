import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  standalone: true,
  imports:[
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ]
})
export class AddPostComponent {
  addPostForm = new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    body: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(500)])
  })

  submit(){
    console.log(this.addPostForm);
  }
}
