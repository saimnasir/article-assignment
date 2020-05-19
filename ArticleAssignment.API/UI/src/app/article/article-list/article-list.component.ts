import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchInputBase } from 'src/app/models/inputs/search-input-base.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '500px',
    minHeight: '500px',
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
    toolbarPosition: 'top'
  };
  modalConfig = new NgbModalConfig();

  articleList: Article[];
  articleForm: FormGroup;
  searchForm: FormGroup;
  isCollapsed = false;

  constructor(
    public articleService: ArticleService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
    this.createForm();
    this.createSearchForm();
  }

  refreshList() {
    this.articleService.listAllAsync().subscribe(list => {
      this.articleList = list;
    });
  }

  onCreate(modal: TemplateRef<any>) {
    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'xl';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalService.open(modal, this.modalConfig);
  }

  search() {
    if (this.searchForm.valid) {
      const searchInput = new SearchInputBase();
      Object.assign(searchInput, this.searchForm.value);
      this.articleService.searchAsync(searchInput).subscribe(result => {
        this.articleList = result;
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  create() {
    if (this.articleForm.valid) {
      const newArticle = new Article();
      Object.assign(newArticle, this.articleForm.value);
      this.articleService.create(newArticle).subscribe(result => {
        this.refreshList();
        this.modalService.dismissAll();
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
      queryText: new FormControl()
    });
  }

  removeFilter() {
    this.refreshList();
    this.searchForm.reset();
  }
}
