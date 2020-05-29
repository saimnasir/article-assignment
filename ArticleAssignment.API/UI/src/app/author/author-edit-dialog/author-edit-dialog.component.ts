import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, ControlValueAccessor } from '@angular/forms';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorListComponent } from '../author-list/author-list.component';
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
      id: new FormControl({ value: this.author.id, disabled: this.isDeleteAction() }),
      firstName: new FormControl({ value: this.author.firstName, disabled: this.isDeleteAction() }),
      middleName: new FormControl({ value: this.author.middleName, disabled: this.isDeleteAction() }),
      lastName: new FormControl({ value: this.author.lastName, disabled: this.isDeleteAction() }),
      email: new FormControl({ value: this.author.email, disabled: this.isDeleteAction() }),
      phone: new FormControl({ value: this.author.phone, disabled: this.isDeleteAction() }),
      about: new FormControl({ value: this.author.about, disabled: this.isDeleteAction() }),
      birthDate: new FormControl({ value: this.author.birthDate, disabled: this.isDeleteAction() }),
      createDate: new FormControl({ value: this.author.createDate, disabled: this.isDeleteAction() }),
      updateDate: new FormControl({ value: this.author.updateDate, disabled: this.isDeleteAction() })
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

  act() {
    if (!this.authorForm.valid) {
      this.openSnackBar('Forms is not valid', null);
      return;
    }

    const model = new Author();
    Object.assign(model, this.authorForm.value);
    console.log('act model', model);

    if (this.isCreateAction()) {
      this.authorService.create(model).subscribe(result => {
        this.container.refreshList();
        this.close();
        this.openSnackBar('New author created!', null);
      });
    } else if (this.isUpdateAction()) {
      this.authorService.update(model).subscribe(result => {
        this.container.refreshList();
        this.close();
        this.openSnackBar('Author updated!', null);
      });
    } else if (this.isDeleteAction()) {
      this.authorService.delete(model.id).subscribe(result => {
        this.container.refreshList();
        this.close();
        this.openSnackBar('Author deleted!', null);
      });
    }
  }

  save() {
    this.dialogRef.close(this.authorForm.value);
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
