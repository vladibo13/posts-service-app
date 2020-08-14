import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(private postService: PostsService) {}

  onAddPost(form: NgForm): void {
    if (form.invalid) return;

    const { title, content } = form.value;
    this.postService.addPost(title, content);
    form.resetForm();
  }

  ngOnInit(): void {}
}
