import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { CRUDActions } from 'src/app/models/enums/action.enum';
import { Article } from 'src/app/models/article.model';
import { AuthorService } from 'src/app/services/author.service';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { CommentEditDialogComponent } from '../comment-edit-dialog/comment-edit-dialog.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() container: CommentListComponent;
  @Input() article: Article;
  @Input() action = CRUDActions.Read;
  @Input() comment: Comment;
  author = new Author();
  model = new Comment();
  commentForm: FormGroup;
  dialogConfig = new MatDialogConfig();

  constructor(
    private commentService: CommentService,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.createForm();
    this.authorService.read(this.article.authorId).subscribe(result => {
      this.author = result;
      this.commentForm.patchValue({ articleId: this.article.id });
      this.commentForm.patchValue({ authorId: this.author.id });
    });

    this.dialogConfig.minHeight = '80%';
    this.dialogConfig.disableClose = false;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = false;
  }


  onEdit() {
    this.action = CRUDActions.Update;
    this.createForm();
  }

  update() {
    if (this.commentForm.valid) {
      Object.assign(this.model, this.commentForm.value);
      this.commentService.update(this.model).subscribe(result => {
        this.comment = result;
        this.container.refreshList();
        this.onDiscardUpdate();
      });
    }
    else {
      this.openSnackBar(`form is in valid`, null);
    }
  }

  create() {
    if (this.commentForm.valid) {
      Object.assign(this.model, this.commentForm.value); 
      this.articleService.addComment(this.model).subscribe(result => {
        this.container.refreshList();
        this.action = CRUDActions.Create;
        this.createForm();
      });
    }
    else {
      this.openSnackBar(`form is in valid`, null);
    }
  }

  onDelete() {
    this.dialogConfig.data = {
      article: this.article,
      author: this.author,
      container: this.container,
      action: CRUDActions.Delete
    };
    this.dialog.open(CommentEditDialogComponent, this.dialogConfig);
  }

  delete() {
    this.commentService.delete(this.comment.id).subscribe(result => {
      this.container.refreshList();
    });
  }

  isCreateAction(): boolean {
    if (this.action === CRUDActions.Create) {
      return true;
    }
    return false;
  }

  isReadAction(): boolean {
    return this.action === CRUDActions.Read;
  }

  isUpdateAction(): boolean {
    return this.action === CRUDActions.Update;
  }

  onDiscardCreate() {
    this.commentForm.get('content').setValue(null);
  }

  onDiscardUpdate() {
    this.action = CRUDActions.Read;
  }

  createForm() {
    if (this.action === CRUDActions.Create) {
      this.commentForm = new FormGroup({
        id: new FormControl(0),
        content: new FormControl(),
        authorId: new FormControl(this.author ? this.author.id : 0),
        articleId: new FormControl(this.article ? this.article.id : 0),
        createDate: new FormControl(new Date()),
        updateDate: new FormControl(new Date()),
        entityState: new FormControl(1)
      });
    } else {
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
  }

  isDeleteAction(): boolean {
    return this.action === CRUDActions.Delete;
  }


  clearField(field: string) {
    this.commentForm.get(field).setValue(null);
  }

  showClearButton(field: string) {
    if (this.commentForm.get(field)) {
      return !this.isDeleteAction() && this.commentForm.get(field).value;
    } else {
      this.openSnackBar(`form not contains field ${field}`, null);
      return false;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
  }

}
