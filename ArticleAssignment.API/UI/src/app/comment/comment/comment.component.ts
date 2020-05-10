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
  showForm = false;
  deleteMode = false;
  ngOnInit(): void {
  }

  toggleShowForm() {
    this.showForm = !this.showForm;
  }

  update() {
    this.commentService.update(this.comment).subscribe(result => {
      this.toggleShowForm();
    });
  }

  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }

  delete() {
    this.commentService.delete(this.comment.id).subscribe(result => {
    });
  }

  discard() {
    this.showForm = false;
    this.deleteMode = false;
  }
}
