import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { Author } from 'src/app/models/author.model';
import { Tag } from 'src/app/models/tag.model';
import { ArticleService } from 'src/app/services/article.service';
import { AuthorService } from 'src/app/services/author.service';
import { TagService } from 'src/app/services/tag.service';
import { SearchTagInput } from 'src/app/models/inputs/search-tag.model';
import { CRUDActions } from 'src/app/models/enums/action.enum';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
  MatChipInputEvent,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';

@Component({
  selector: 'app-article-edit-dialog',
  templateUrl: './article-edit-dialog.component.html',
  styleUrls: ['./article-edit-dialog.component.css']
})
export class ArticleEditDialogComponent implements OnInit {

  action = CRUDActions.Read;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '300px',
    minHeight: '300px',
    maxHeight: '500px',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    enableToolbar: false,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top'
  };

  article: Article;
  author: Author;
  container: any;

  dialogTitle: string;
  articleForm: FormGroup;
  tagsOfArticle: Tag[] = [];
  removedTagsOfArticle: Tag[] = [];
  allTags: Tag[] = [];

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControl = new FormControl();
  filteredTags: Observable<string[]>;
  allTagTitles: string[] = [];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoComplete') matAutocomplete: MatAutocomplete;

  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService,
    private tagService: TagService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ArticleEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar
  ) {
    this.article = data.article;
    this.author = data.author;
    this.action = data.action;
    this.container = data.container;
  }

  ngOnInit(): void {
    if (!this.article) { // set author if not defined
      this.article = new Article();
    }

    this.setTitle();
    this.createForm();
    this.getArticleTags();
    this.getAllTags();

    this.filteredTags = this.tagControl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((tatTitle: string | null) => tatTitle ? this._filter(tatTitle) : this.allTagTitles.slice()));
  }

  private createForm() {
    this.articleForm = this.fb.group({
      id: new FormControl({ value: this.article.id, disabled: this.isDeleteAction() }),
      title: new FormControl({ value: this.article.title, disabled: this.isDeleteAction() }),
      content: new FormControl({ value: this.article.content, disabled: this.isDeleteAction() }),
      // authorId: new FormControl({ value: this.author.id, disabled: this.isDeleteAction() }),
      categoryId: new FormControl({ value: this.article.categoryId, disabled: this.isDeleteAction() }),
      createDate: new FormControl({ value: this.article.createDate, disabled: this.isDeleteAction() }),
      updateDate: new FormControl({ value: this.article.updateDate, disabled: this.isDeleteAction() }),
      entityState: new FormControl({ value: this.article.entityState, disabled: this.isDeleteAction() }),
      state: new FormControl({ value: this.article.state, disabled: this.isDeleteAction() }),
      specie: []
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTagTitles.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  private getArticleTags() {
    const input = new SearchTagInput();
    input.ArticleId = this.article.id;
    this.tagService.searchAsync(input, 'Search').subscribe(articleTags => {
      this.tagsOfArticle = articleTags;
    });
  }

  private getAllTags() {
    this.tagService.listAllAsync().subscribe(allTags => {
      this.allTags = allTags;
      this.allTags.forEach(t => {
        this.allTagTitles.push(t.title);
      });
    });
  }

  submit() {
    const model = new Article();
    Object.assign(model, this.articleForm.value);
    model.authorId = this.author.id;
    console.log('act this.articleForm', this.articleForm);
    console.log('act model', model);

    if (this.isCreateAction()) {
      if (!this.author) { // TEMP -- this author must be logged user
        this.authorService.listAllAsync()
          .subscribe(list => {
            this.author = list[0];
            this.create(model);
          });
      } else {
        this.create(model);
      }
    } else if (this.isUpdateAction()) {
      this.update(model);
    } else if (this.isDeleteAction()) {
      this.delete(model);
    }
  }

  private delete(model: Article) {
    this.articleService.delete(model.id).subscribe(result => {
      this.container.refreshList();
      this.close();
      this.openSnackBar('Author deleted!', null);
    });
  }

  private update(model: Article) {
    this.articleService.update(model).subscribe(() => {
      this.articleService.addTags(this.tagsOfArticle).subscribe(() => {
        this.articleService.removeTags(this.removedTagsOfArticle).subscribe(() => {
          this.container.refreshList();
          this.close();
          this.openSnackBar('Author updated!', null);
        });
      });
    });
  }

  private create(model: Article) {
    this.articleService.create(model).subscribe(result => {
      // this.createTags(result);
      this.container.refreshList();
      this.close();
      this.openSnackBar('New author created!', null);
    });
  }

  setTitle() {
    switch (this.action) {
      case CRUDActions.Create:
        this.dialogTitle = 'Create new Article';
        break;
      case CRUDActions.Update:
        this.dialogTitle = 'Edit Article';
        break;
      case CRUDActions.Delete:
        this.dialogTitle = 'Delete Article';
        break;
    }
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
    this.articleForm.get(field).setValue(null);
  }

  showClearButton(field: string) {
    if (this.articleForm.get(field)) {
      return !this.isDeleteAction() && this.articleForm.get(field).value;
    } else {
      this.openSnackBar(`form not contains field ${field}`, null);
      return false;
    }
  }

  remove(tag: Tag): void {
    this.tagsOfArticle = this.tagsOfArticle.filter(t => t.title !== tag.title);
    if (!this.removedTagsOfArticle.find(t => t.title === tag.title)) {
      this.removedTagsOfArticle.push(tag);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.tagsOfArticle.find(t => t.title.toLowerCase() === event.option.viewValue.toLowerCase())) {
      const model = new Tag();
      model.articleId = this.article.id;
      model.createDate = new Date();
      model.updateDate = new Date();
      model.title = event.option.viewValue;
      model.description = event.option.viewValue;
      this.tagsOfArticle.push(model);
      this.tagInput.nativeElement.value = '';
      this.tagControl.setValue(null);
    } else {
      this.openSnackBar(`${event.option.viewValue} is already added.`, null);
    }
  }

  addTag(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if (!this.tagsOfArticle.find(t => t.title.toLowerCase() === event.value.toLowerCase())) {
        const model = new Tag();
        model.articleId = this.article.id;
        model.createDate = new Date();
        model.updateDate = new Date();
        model.title = value;
        model.description = value;
        this.tagsOfArticle.push(model);
      } else {
        this.openSnackBar(`${event.value} is already added.`, null);
        return;
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: Tag) {
    this.tagsOfArticle = this.tagsOfArticle.filter(t => t.title !== tag.title);
  }

  /*
  filterArticleTagsById(tag: Tag): boolean {
    return this.tagsOfArticle.findIndex(t => t.id === tag.id) < 0;
  }

  filterArticleTagsByTitle(tag: Tag): boolean {
    return this.tagsOfArticle.findIndex(t => t.title === tag.title) >= 0;
  }

  filterByTitle(title: string): boolean {
    return this.tagsOfArticle.findIndex(t => t.title === title) >= 0;
  }

  filterAllTags(title: string): boolean {
    return this.allTags.findIndex(t => t.title === title) >= 0;
  }
  */
}