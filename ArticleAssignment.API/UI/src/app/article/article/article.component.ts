import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { ArticleService } from 'src/app/services/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {


  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '500px',
    minHeight: '0',
    maxHeight: 'auto',
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
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService) { }

  @Input() article: Article;
  collapsed = true;
  showForm = false;
  deleteMode = false;

  author: Author;
  model = new Article();

  articleForm: FormGroup;
  htmlContent: string;
  ngOnInit(): void {
    this.authorService.read(this.article.authorId).subscribe(author => {
      this.author = author;
    });
    this.createForm();
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  onEdit() {
    if (this.collapsed === true) {
      this.toggleCollapse();
    }
    this.toggleShowForm();
  }

  toggleShowForm() {
    this.showForm = !this.showForm;
    if (this.collapsed) {
      this.collapsed = !this.collapsed;
    }
  }

  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }

  update() {
    if (this.articleForm.valid) {
      Object.assign(this.model, this.articleForm.value);

      this.articleService.update(this.model).subscribe(result => {
        this.article = result;
        this.toggleShowForm();
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  delete() {
    this.articleService.delete(this.article.id).subscribe(result => {
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

  discard() {
    this.showForm = false;
    this.deleteMode = false;
  }

}
