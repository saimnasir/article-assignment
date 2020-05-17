import { Component, OnInit, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { SearchTagInput } from 'src/app/models/inputs/search-tag.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Article } from 'src/app/models/article.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, catchError } from 'rxjs/operators';
import { ArticleService } from 'src/app/services/article.service';
import { strict } from 'assert';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TagListComponent implements OnInit {

  @Input() article: Article;
  modalConfig = new NgbModalConfig();
  tagsOfArticle: Tag[];
  tags: Tag[];
  autoCompleteModel: any;

  constructor(
    public tagService: TagService,
    public articleService: ArticleService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    const input = new SearchTagInput();
    input.ArticleId = this.article.id;

    this.tagService.searchAsync(input, 'Search').subscribe(articleTags => {
      this.tagsOfArticle = articleTags;

      this.tagService.listAllAsync().subscribe(allTags => {
        this.tags = allTags.filter(t => this.filterArticleTagsById(t));
      });
    });
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.tags.filter(v => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
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

  onCreate(modal: TemplateRef<any>) {
    this.modalService.dismissAll();
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
    if (this.filterArticleTagsByTitle(model)) {
      alert('This tag is already added!');
    } else {
      console.log('model', model);
      this.articleService.addTag(model).subscribe(result => {
        this.modalService.dismissAll();
        this.refreshList();
        this.autoCompleteModel = null;
      });
    }
  }
}

