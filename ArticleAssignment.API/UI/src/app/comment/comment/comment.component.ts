import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { CRUDActions } from 'src/app/models/enums/action.enum';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() container: CommentListComponent;

  constructor(
    private commentService: CommentService,
    private articleService: ArticleService
  ) { }

  @Input() comment: Comment;
  @Input() author: Author;
  @Input() article: Article;
  action: CRUDActions;
  model = new Comment();
  commentForm: FormGroup;

  header: string;
  cardClass = '';
  ngOnInit(): void {
    this.action = CRUDActions.Read;
  }

  onEdit() {
    this.action = CRUDActions.Update;
    this.cardClass = 'alert-success';
    this.commentForm = new FormGroup({
      id: new FormControl(this.comment.id),
      content: new FormControl(this.comment.content),
      authorId: new FormControl(this.comment.authorId),
      articleId: new FormControl(this.comment.articleId),
      createDate: new FormControl(this.comment.createDate),
      updateDate: new FormControl(this.comment.updateDate),
      entityState: new FormControl(this.comment.entityState)
    });
  }

  onCreate() {
    this.action = CRUDActions.Create;
    this.cardClass = 'alert-success';

    this.commentForm = new FormGroup({
      id: new FormControl(0),
      content: new FormControl(),
      authorId: new FormControl(this.author.id),
      articleId: new FormControl(this.article.id),
      createDate: new FormControl(new Date()),
      updateDate: new FormControl(new Date()),
      entityState: new FormControl(1)
    });
  }

  update() {
    if (this.commentForm.valid) {
      Object.assign(this.model, this.commentForm.value);
      this.commentService.update(this.model).subscribe(result => {
        this.container.refreshList();
        this.discard();
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  create() {
    if (this.commentForm.valid) {
      Object.assign(this.model, this.commentForm.value);
      this.articleService.addComment(this.model).subscribe(result => {
        this.container.refreshList();
        this.discard();
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  toggleDeleteMode() {
    this.action = CRUDActions.Delete;
  }

  delete() {
    this.commentService.delete(this.comment.id).subscribe(result => {
      this.container.refreshList();
      this.discard();
    });
  }


  isCreateAction(): boolean {
    return this.action === CRUDActions.Create;
  }

  isReadAction(): boolean {
    return this.action === CRUDActions.Read;
  }

  isUpdateAction(): boolean {
    return this.action === CRUDActions.Update;
  }

  isDeleteAction(): boolean {
    return this.action === CRUDActions.Delete;
  }

  showForm(): boolean {
    const show = this.action === CRUDActions.Create || this.action === CRUDActions.Update;
    return show;
  }

  discard() {
    this.action = CRUDActions.Read;
    this.cardClass = 'alert-light';

  }

}
