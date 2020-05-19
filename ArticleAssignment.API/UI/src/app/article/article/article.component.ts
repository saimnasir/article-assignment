import { Component, OnInit, Input, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { ArticleService } from 'src/app/services/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ArticleListComponent } from '../article-list/article-list.component';
import { ActivatedRoute } from '@angular/router';
import { CommentListComponent } from 'src/app/comment/comment-list/comment-list.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SearchTagInput } from 'src/app/models/inputs/search-tag.model';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @ViewChild(CommentListComponent, { static: false }) appComments: CommentListComponent;
  @Input() container: ArticleListComponent;

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
  articleId: number;
  author: Author;
  model = new Article();
  articleForm: FormGroup;
  modalConfig = new NgbModalConfig();
  tagsOfArticle: Tag[];
  tags: Tag[];
  autoCompleteModel: any;
  modal: TemplateRef<any>;
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private tagService: TagService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id');
    if (!this.articleId) {
      this.articleId = this.article.id;
    }
    this.authorService.read(this.article.authorId)
      .subscribe(result => {
        this.author = result;
        this.listTags();
      });
    this.createForm();
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
    if (tagTitle) {
      const model = new Tag();
      model.articleId = this.article.id;
      model.title = tagTitle;
      model.createDate = new Date();
      model.updateDate = new Date();
      model.description = tagTitle;
      if (!this.filterArticleTagsByTitle(model)) {
        this.tagsOfArticle.push(model);
        this.autoCompleteModel = null;
      }
    }
  }

  showTagAddedWaring(): boolean {
    const tag = new Tag();
    tag.title = this.autoCompleteModel;
    return this.filterArticleTagsByTitle(tag);
  }

  removeTag(tag: Tag) {
    this.tagsOfArticle = this.tagsOfArticle.filter(t => t.title !== tag.title);
  }

  onUpdate(modal: TemplateRef<any>) {
    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'xl';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalService.open(modal, this.modalConfig);
  }

  onDelete(modal: TemplateRef<any>) {
    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'xl';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalConfig.centered = false;
    this.modalService.open(modal, this.modalConfig);
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
      this.container.refreshList();
      this.modalService.dismissAll();
    });
  }

  createForm() {
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
  }

  toggleComments() {
    this.appComments.toggleComments();
  }

  commentCounts(): number {
    return this.appComments.commentCounts();
  }

  onTagInputChange() {
    this.addTag();
  }
}
