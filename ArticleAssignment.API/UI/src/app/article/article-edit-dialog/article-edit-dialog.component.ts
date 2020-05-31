import { Component, OnInit, ViewChild, TemplateRef, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, ControlValueAccessor } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { Author } from 'src/app/models/author.model';
import { Tag } from 'src/app/models/tag.model';
import { ArticleService } from 'src/app/services/article.service';
import { AuthorService } from 'src/app/services/author.service';
import { TagService } from 'src/app/services/tag.service';
import { SearchTagInput } from 'src/app/models/inputs/search-tag.model';
import { CRUDActions } from 'src/app/models/enums/action.enum';


@Component({
  selector: 'app-article-edit-dialog',
  templateUrl: './article-edit-dialog.component.html',
  styleUrls: ['./article-edit-dialog.component.css']
})
export class ArticleEditDialogComponent implements OnInit, ControlValueAccessor {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  prompt = 'Press <enter> to add "';
  options: string[] = ['One', 'Two', 'Three'];


  showTagAddedWaring = false;
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


  // data
  article: Article;
  author: Author;
  container: any;


  tagsOfArticle: Tag[] = [];
  availableTags: Tag[] = [];
  removedTagsOfArticle: Tag[] = [];
  showAddButton = false;

  header: string;
  model = new Article();
  articleForm: FormGroup;
  tags: Tag[];
  autoCompleteModel: any;
  @ViewChild('formModal') public formModal: TemplateRef<any>;
  // @ViewChild('deleteModal') deleteModal: TemplateRef<any>;

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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
  }

  ngOnInit(): void {
    if (!this.article) { // set author if not defined
      this.article = new Article();
    }

    this.setTitle();
    this.createForm();
    this.getArticleTags();
    this.getAvailableTags();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value))
    );
  }

  filterOptions(value: string): string[] {
    let results = this.options.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) === 0);

    this.showAddButton = results.length === 0;
    if (this.showAddButton) {
      results = [this.prompt + value + '"'];
    }
    return results;
  }


  optionSelected(option) {
    if (option.value.indexOf(this.prompt) === 0) {
      this.addOption();
    }
  }

  addOption() {
    const option = this.removePromptFromOption(this.myControl.value);
    if (!this.options.some(entry => entry === option)) {
      const index = this.options.push(option) - 1;
      this.myControl.setValue(this.options[index]);
    }
    this.addTag();
  }

  removePromptFromOption(option) {
    if (option.startsWith(this.prompt)) {
      option = option.substring(this.prompt.length, option.length - 1);
    }
    return option;
  }
  selectionChange() {
    this.openSnackBar('selectionChange', null);
  }
  private getAvailableTags() {
    this.tagService.listAllAsync().subscribe(allTags => {
      this.availableTags = allTags.filter(t => this.filterArticleTagsById(t));
    });
  }

  private getArticleTags() {
    const input = new SearchTagInput();
    input.ArticleId = this.article.id;
    this.tagService.searchAsync(input, 'Search').subscribe(articleTags => {
      this.tagsOfArticle = articleTags;
    });
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
      state: new FormControl({ value: this.article.state, disabled: this.isDeleteAction() })
    });


  }

  setTitle() {
    switch (this.action) {
      case CRUDActions.Create:
        this.header = 'Create new Article';
        break;
      case CRUDActions.Update:
        this.header = 'Edit Article';
        break;
      case CRUDActions.Delete:
        this.header = 'Delete Article';
        break;
    }
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
    this.articleService.update(model).subscribe(result => {
      this.container.refreshList();
      this.close();
      this.openSnackBar('Author updated!', null);
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
    console.log('clearField this.articleForm', this.articleForm);
    this.articleForm.get(field).setValue(null);
  }

  showClearButton(field: string) {
    if (this.articleForm.get(field)) {
      return !this.isDeleteAction() && this.articleForm.get(field).value;
    } else {
      console.log('showClearButton on invalid this.articleForm.get(field)', this.articleForm.get(field).value);

      return false;
    }
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


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.addTag();
    }
  }

  listTags() {
    const input = new SearchTagInput();
    input.ArticleId = this.article.id;
    this.tagService.searchAsync(input, 'Search').subscribe(articleTags => {
      this.tagsOfArticle = articleTags;
      this.tagService.listAllAsync().subscribe(allTags => {
        this.tags = allTags.filter(t => this.filterArticleTagsById(t));
      });
    });
  }

  resultFormatBandListValue(value: any) {
    return value.title;
  }

  inputFormatBandListValue(value: any) {
    if (value.title) {
      return value.title;
    }
    return value;
  }

  filterArticleTagsById(tag: Tag): boolean {
    return this.tagsOfArticle.findIndex(t => t.id === tag.id) < 0;
  }

  filterArticleTagsByTitle(tag: Tag): boolean {
    return this.tagsOfArticle.findIndex(t => t.title === tag.title) >= 0;
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.tags.filter(v => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  }

  // onAddTag(modal: TemplateRef<any>) {
  //   this.modalConfig.ariaLabelledBy = 'modal-basic-title';
  //   this.modalConfig.size = 'md';
  //   this.modalConfig.backdrop = 'static';
  //   this.modalConfig.keyboard = false;
  //   this.modalService.open(modal, this.modalConfig);
  // }

  addTag() {
    console.log('this.myControl', this.myControl.value);

    const model = new Tag();
    model.articleId = this.article.id;
    model.createDate = new Date();
    model.updateDate = new Date();
    model.title = this.myControl.value;
    model.description = this.myControl.value;

    if (!this.filterArticleTagsByTitle(model)) {
      this.tagsOfArticle.push(model);
      this.showTagAddedWaring = false;
      this.autoCompleteModel = null;
      this.myControl.setValue(null);
    } else {
      this.showTagAddedWaring = true;
      this.myControl.setValue(null);
    }
  }

  removeTag(tag: Tag) {
    this.tagsOfArticle = this.tagsOfArticle.filter(t => t.title !== tag.title);
  }
}
