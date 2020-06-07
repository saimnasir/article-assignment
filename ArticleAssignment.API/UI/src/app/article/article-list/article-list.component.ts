import { Component, OnInit, TemplateRef } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchInputBase } from 'src/app/models/inputs/search-input-base.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tag } from 'src/app/models/tag.model';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TagService } from 'src/app/services/tag.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CRUDActions } from 'src/app/models/enums/action.enum';
import { ArticleEditDialogComponent } from '../article-edit-dialog/article-edit-dialog.component';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '400px',
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

  loggedAuthor: Author;
  modalConfig = new NgbModalConfig();
  articleList: Article[];
  articleForm: FormGroup;
  searchForm: FormGroup;
  isCollapsed = false;
  tagsOfArticle: Tag[] = [];
  allTags: Tag[];
  newTag: any;
  filterPanelOpenState = false;

  constructor(
    public articleService: ArticleService,
    private authorService: AuthorService,
    private tagService: TagService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshList();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.minWidth = '80%';
    dialogConfig.minHeight = '80%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    dialogConfig.data = {
      author: this.authorService.loggedAuthor,
      container: this,
      action: CRUDActions.Create,
    };

    this.dialog.open(ArticleEditDialogComponent, dialogConfig);
  }

  refreshList() {
    this.articleService.listAllAsync().subscribe(list => {
      this.articleList = list;
    });
    this.createSearchForm();
    this.refreshTaglist();
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

  refreshTaglist() {
    this.tagService.listAllAsync().subscribe(result => {
      this.allTags = result;
    });
  }

  searchTag = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.allTags.filter(v => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  }

  search() {
    if (this.searchForm.valid) {
      const searchInput = new SearchInputBase('');
      Object.assign(searchInput, this.searchForm.value);
      this.articleService.searchAsync(searchInput).subscribe(result => {
        this.articleList = result;
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  createForm() {
    this.articleForm = new FormGroup({
      id: new FormControl(0),
      title: new FormControl(),
      content: new FormControl(),
      authorId: new FormControl(3),
      categoryId: new FormControl(6),
      entityState: new FormControl(1),
      state: new FormControl(1),
      birthDate: new FormControl(new Date()),
      createDate: new FormControl(new Date()),
      updateDate: new FormControl()
    });
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      QueryText: new FormControl()
    });
  }

  removeFilter() {
    this.refreshList();
    this.searchForm.reset();
  }

  clearField(field: string) {
    this.searchForm.get(field).setValue(null);
    this.search();
  }

  removeTag(tag: Tag) {
    this.tagsOfArticle = this.tagsOfArticle.filter(t => t.title !== tag.title);
  }

  onTagInputChange() {
    this.addTag();
  }

  addTag() {
    let tagTitle = '';
    if (this.newTag instanceof Object) {
      tagTitle = this.newTag.title;
    } else {
      tagTitle = this.newTag;
    }
    if (tagTitle) {
      const model = new Tag();
      model.articleId = 0;
      model.title = tagTitle;
      model.createDate = new Date();
      model.updateDate = new Date();
      model.description = tagTitle;
      if (!this.filterArticleTagsByTitle(model)) {
        this.tagsOfArticle.push(model);
        this.newTag = null;
      }
    }
  }

  showTagAddedWaring(): boolean {
    const tag = new Tag();
    tag.title = this.newTag;
    return this.filterArticleTagsByTitle(tag);
  }

  filterArticleTagsById(tag: Tag): boolean {
    return this.tagsOfArticle.findIndex(t => t.id === tag.id) < 0;
  }

  filterArticleTagsByTitle(tag: Tag): boolean {
    return this.tagsOfArticle.findIndex(t => t.title === tag.title) >= 0;
  }

  createTags(article: Article) {
    this.tagsOfArticle.forEach(tag => {
      tag.articleId = article.id;
      tag.description = tag.title;
      this.articleService.addTag(tag).subscribe();
    });
  }

}
