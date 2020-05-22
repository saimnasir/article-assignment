//#region  imports

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
import { Tag } from 'src/app/models/tag.model';
import { TagListComponent } from 'src/app/tag/tag-list/tag-list.component';

//#endregion imports

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {

  // #region  editor config
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
  //#endregion

  @ViewChild(CommentListComponent, { static: false }) appComments: CommentListComponent;
  @ViewChild(TagListComponent, { static: false }) appTags: TagListComponent;

  @Input() container: ArticleListComponent;
  @Input() article: Article;

  articleId: number;
  author: Author;
  articleForm: FormGroup;
  modalConfig = new NgbModalConfig();
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private authorService: AuthorService,
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
      });
    this.createForm();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.onTagInputChange();
    }
  }

  showTagAddedWaring(): boolean {
    const tag = new Tag();
    tag.title = this.appTags.tagTitle;
    return this.appTags.filterArticleTagsByTitle(tag);
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
    this.submitted = true;
    console.log('this.articleForm.value', this.articleForm);

    // stop here if form is invalid
    if (this.articleForm.invalid) {
      return;
    }
    const model = new Article();
    Object.assign(model, this.articleForm.value);
    this.articleService.update(model).subscribe(result => {
      this.article = result;
      this.appTags.createAndDeleteTags().subscribe(() => {
        this.appTags.refreshList();
      });
      this.modalService.dismissAll();
    });
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
    this.appTags.addTag();
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.articleForm.controls; }
}
