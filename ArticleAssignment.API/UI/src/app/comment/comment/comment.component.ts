import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private commentService: CommentService) { }

  @Input() comment: Comment;
  @Input() author: Author;
  showFrom = false;
  ngOnInit(): void {
  }

  toggleShowCommentFrom() {
    this.showFrom = !this.showFrom;
  }

  update() {
    this.commentService.update(this.comment).subscribe(result => {
      this.toggleShowCommentFrom();
    });
  }

  delete() {
    this.commentService.delete(this.comment.id).subscribe(result => {
    });
  }
}
