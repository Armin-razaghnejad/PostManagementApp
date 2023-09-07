import { Injectable } from "@angular/core";
import { Post } from "../types/post";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from 'rxjs';
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Array<Post>> {
    return this.http.get<Post[]>(environment.API_URL)
      .pipe(map((posts) => posts || []))
  }

}