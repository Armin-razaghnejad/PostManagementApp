import { Injectable } from "@angular/core";
import { Post } from "../types/post";
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject, map } from 'rxjs';
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  callSnackBar = new ReplaySubject<{action:boolean, message:string}>(1);

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Array<Post>> {
    return this.http.get<Post[]>(environment.API_URL)
      .pipe(map((posts) => posts || []))
  }

  addNewPosts(post: Post): Observable<Post> {
    return this.http.post<Post>(environment.API_URL, { ...post })
      .pipe(map((posts) => posts || []))
  }

}