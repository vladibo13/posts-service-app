import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First Post', content: 'This is my first post' },
  //   { title: 'Second Post', content: 'This is my second post' },
  //   { title: 'Third Post', content: 'This is my third post' },
  // ];
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(private postService: PostsService, private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ng oninit run');

    this.postService.getPosts();
    this.postSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        console.log('subscribing...');
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe;
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }
}
