import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      `http://localhost:3000/api/posts/${id}`
    );
  }

  getPosts(): void {
    this.http
      .get<{ msg: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((p) => {
            return {
              title: p.title,
              content: p.content,
              id: p._id,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string): void {
    const post = { id: null, title, content };
    this.http
      .post<{ msg: string; id: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        console.log(responseData.msg);
        const idFromServer = responseData.id;
        post.id = idFromServer;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    this.http.delete(`http://localhost:3000/api/posts/${id}`).subscribe(() => {
      const updatedPosts = this.posts.filter((p) => p.id !== id);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id, title, content };
    this.http
      .put(`http://localhost:3000/api/posts/${id}`, post)
      .subscribe((res) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
}
