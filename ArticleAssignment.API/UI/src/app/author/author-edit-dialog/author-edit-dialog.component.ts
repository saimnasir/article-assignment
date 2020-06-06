import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, ControlValueAccessor } from '@angular/forms';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { CRUDActions } from 'src/app/models/enums/action.enum';

@Component({
  selector: 'app-author-edit-dialog',
  templateUrl: './author-edit-dialog.component.html',
  styleUrls: ['./author-edit-dialog.component.css']
})
export class AuthorEditDialogComponent implements OnInit, ControlValueAccessor {

  authorForm: FormGroup;
  container: any;
  author: Author;
  action = CRUDActions.Read;
  title: string;
  constructor(
    private authorService: AuthorService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthorEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar
  ) {
    this.container = data.container;
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
    if (!this.author) { // set author if not defined
      this.author = new Author();
    }

    this.authorForm = this.fb.group({
      id: new FormControl(this.author.id),
      firstName: new FormControl(this.author.firstName),
      middleName: new FormControl(this.author.middleName),
      lastName: new FormControl(this.author.lastName),
      email: new FormControl(this.author.email),
      phone: new FormControl(this.author.phone),
      about: new FormControl(this.author.about),
      birthDate: new FormControl(this.author.birthDate),
      createDate: new FormControl(this.author.createDate),
      updateDate: new FormControl(this.author.updateDate)
    });

    this.setTitle();
  }

  setTitle() {
    switch (this.action) {
      case CRUDActions.Create:
        this.title = 'Create new Author';
        break;
      case CRUDActions.Update:
        this.title = 'Edit Author';
        break;
      case CRUDActions.Delete:
        this.title = 'Delete Author';
        break;
    }
  }

  submit() {
    if (!this.authorForm.valid) {
      this.openSnackBar('Forms is not valid', null);
      return;
    }
    const model = new Author();
    Object.assign(model, this.authorForm.value);

    if (this.isCreateAction()) {
      this.create(model);
    } else if (this.isUpdateAction()) {
      this.update(model);
    } else if (this.isDeleteAction()) {
      this.delete(model);
    }
  }

  private delete(model: Author) {
    this.authorService.delete(model.id).subscribe(result => {
      this.container.refreshList();
      this.close();
      this.openSnackBar('Author deleted!', null);
    });
  }

  private update(model: Author) {
    this.authorService.update(model).subscribe(result => {
      this.container.refreshList();
      this.close();
      this.openSnackBar('Author updated!', null);
    });
  }

  private create(model: Author) {
    this.authorService.create(model).subscribe(result => {
      this.container.refreshList();
      this.close();
      this.openSnackBar('New author created!', null);
    });
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
    this.authorForm.get(field).setValue(null);
  }

  showClearButton(field: string) {
    return !this.isDeleteAction() && this.authorForm.get(field).value;
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
