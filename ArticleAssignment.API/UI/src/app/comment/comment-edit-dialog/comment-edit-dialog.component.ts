import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, ControlValueAccessor } from '@angular/forms';
import { CRUDActions } from 'src/app/models/enums/action.enum';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { AuthorFullName, Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-comment-edit-dialog',
  templateUrl: './comment-edit-dialog.component.html',
  styleUrls: ['./comment-edit-dialog.component.css']
})
export class CommentEditDialogComponent implements OnInit, ControlValueAccessor {

  commentForm: FormGroup;
  container: any;
  comment: Comment;
  author: Author;
  action = CRUDActions.Read;
  title: string;
  constructor(
    private commentService: CommentService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CommentEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar
  ) {
    this.container = data.container;
    this.comment = data.comment;
    this.author = data.author;
    this.action = data.action;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
  }

  ngOnInit() {
    if (!this.comment) { // set author if not defined
      this.comment = new Comment();
    }

    this.commentForm = this.fb.group({
      id: new FormControl(this.comment.id),
      content: new FormControl(this.comment.content),
      authorId: new FormControl(this.comment.authorId),
      articleId: new FormControl(this.comment.articleId),
      createDate: new FormControl(this.comment.createDate),
      updateDate: new FormControl(this.comment.updateDate),
      entityState: new FormControl(this.comment.entityState)
    });

    this.setTitle();
  }

  setTitle() {
    switch (this.action) {
      case CRUDActions.Create:
        this.title = 'Create new Comment';
        break;
      case CRUDActions.Update:
        this.title = 'Edit Comment';
        break;
      case CRUDActions.Delete:
        this.title = 'Delete Comment';
        break;
    }
  }

  submit() {
    if (!this.commentForm.valid) {
      this.openSnackBar('Forms is not valid', null);
      return;
    }
    const model = new Comment();
    Object.assign(model, this.commentForm.value);

    if (this.isCreateAction()) {
      this.create(model);
    } else if (this.isUpdateAction()) {
      this.update(model);
    } else if (this.isDeleteAction()) {
      this.delete(model);
    }
  }

  private delete(model: Comment) {
    this.commentService.delete(model.id).subscribe(result => {
      this.container.refreshList();
      this.close();
      this.openSnackBar('Comment deleted!', null);
    });
  }

  private update(model: Comment) {
    this.commentService.update(model).subscribe(result => {
      this.container.refreshList();
      this.close();
      this.openSnackBar('Comment updated!', null);
    });
  }

  private create(model: Comment) {
    this.commentService.create(model).subscribe(result => {
      this.container.refreshList();
      this.close();
      this.openSnackBar('New comment created!', null);
    });
  }


  getAuthorFullName(): string {
    return AuthorFullName(this.author);
  }


  close() {
    this.dialogRef.close();
  }

  isCreateAction(): boolean {
    return this.action === CRUDActions.Create;
  }

  isUpdateAction(): boolean {
    return this.action === CRUDActions.Update;
  }

  isDeleteAction(): boolean {
    return this.action === CRUDActions.Delete;
  }

  clearField(field: string) {
    this.commentForm.get(field).setValue(null);
  }

  showClearButton(field: string) {
    return !this.isDeleteAction() && this.commentForm.get(field).value;
  }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

}
