import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  mode = 'create';
  postId: string;
  post: Post;
  isLoading = false;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  onSavePost(form: NgForm): void {
    if (form.invalid) return;

    const { title, content } = form.value;

    this.isLoading = true;

    if (this.mode === 'create') {
      this.postService.addPost(title, content);
    } else {
      console.log('POST ID = ', this.postId);
      this.postService.updatePost(this.postId, title, content);
    }

    form.resetForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((p) => {
          this.isLoading = false;
          this.post = { id: p._id, title: p.title, content: p.content };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}
