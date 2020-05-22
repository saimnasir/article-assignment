import { Component, OnInit, Input, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { ArticleService } from 'src/app/services/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ArticleListComponent } from '../../article-list/article-list.component';
import { ActivatedRoute } from '@angular/router';
import { CommentListComponent } from 'src/app/comment/comment-list/comment-list.component';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SearchTagInput } from 'src/app/models/inputs/search-tag.model';
import { CRUDActions } from 'src/app/models/enums/action.enum';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  showTagAddedWaring = false;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '0',
    maxHeight: '400px',
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

  @Input() article: Article;
  @Input() author: Author;
  @Input() tagsOfArticle: Tag[];
  @Input() action: CRUDActions;

  model = new Article();
  articleForm: FormGroup;
  modalConfig = new NgbModalConfig();
  tags: Tag[];
  autoCompleteModel: any;
  @ViewChild('formModal') public formModal: TemplateRef<any>;
  // @ViewChild('deleteModal') deleteModal: TemplateRef<any>;

  modalRef: NgbModalRef;

  constructor(
    private articleService: ArticleService,
    private tagService: TagService,
    public modalService: NgbModal) { }

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      id: new FormControl(this.article.id),
      title: new FormControl(this.article.title),
      content: new FormControl(this.article.content),
      authorId: new FormControl(this.article.authorId),
      categoryId: new FormControl(this.article.categoryId),
      createDate: new FormControl(this.article.createDate),
      updateDate: new FormControl(this.article.updateDate),
      entityState: new FormControl(this.article.entityState),
      state: new FormControl(this.article.state),
    });
    this.onUpdate();
  }


  onUpdate() {
    console.log('onUpdate');
    console.log('this.formModal', this.formModal);

    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'xl';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalService.open(this.formModal, this.modalConfig);
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

  onAddTag(modal: TemplateRef<any>) {
    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'md';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalService.open(modal, this.modalConfig);
  }

  addTag() {
    let tagTitle = '';
    if (this.autoCompleteModel instanceof Object) {
      tagTitle = this.autoCompleteModel.title;
    } else {
      tagTitle = this.autoCompleteModel;
    }
    const model = new Tag();
    model.articleId = this.article.id;
    model.title = tagTitle;
    model.createDate = new Date();
    model.updateDate = new Date();
    model.description = tagTitle;
    if (!this.filterArticleTagsByTitle(model)) {
      this.tagsOfArticle.push(model);
      this.showTagAddedWaring = false;
      this.autoCompleteModel = null;
    } else {
      this.showTagAddedWaring = true;
    }
  }

  removeTag(tag: Tag) {
    this.tagsOfArticle = this.tagsOfArticle.filter(t => t.title !== tag.title);
  }


  create() {
    if (this.articleForm.valid) {
      const newArticle = new Article();
      Object.assign(newArticle, this.articleForm.value);
      this.articleService.create(newArticle).subscribe(result => {
        // this.refreshList();
        this.modalService.dismissAll();
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  update() {
    if (this.articleForm.valid) {
      Object.assign(this.model, this.articleForm.value);
      this.articleService.update(this.model).subscribe(result => {
        this.article = result;
        this.modalService.dismissAll();
      });
    }
    else {
      alert('forms is in valid');
    }
  }


  delete() {
    this.articleService.delete(this.article.id).subscribe(result => {
      // this.container.refreshList();
      this.modalService.dismissAll();
    });
  }
  isCreateAction(): boolean {
    return this.action === CRUDActions.Create;
  }

  isUpdateAction(): boolean {
    return this.action === CRUDActions.Update;
  }

  showForm(): boolean {
    return this.action === CRUDActions.Create || this.action === CRUDActions.Update;
  }

}
