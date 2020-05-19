import { Component, OnInit, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { SearchTagInput } from 'src/app/models/inputs/search-tag.model';
import { Article } from 'src/app/models/article.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TagListComponent implements OnInit {

  @Input() article: Article;
  modalConfig = new NgbModalConfig();
  tagsOfArticle: Tag[] = [];
  availableTags: Tag[] = [];
  removedTagsOfArticle: Tag[] = [];
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
      console.log('this.tagsOfArticle', this.tagsOfArticle);
    });
    this.tagService.listAllAsync().subscribe(allTags => {
      this.availableTags = allTags.filter(t => this.filterArticleTagsById(t));
      console.log('this.availableTags', this.availableTags);

    });
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.availableTags.filter(v => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
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

  addTag(tag: Tag) {
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
        this.availableTags = this.availableTags.filter(t => t.title !== model.title);
      }
    }
  }

  removeTag(tag: Tag) {
    console.log('removeTag Tag:', tag);
    console.log('removeTag removedTagsOfArticle:', this.removedTagsOfArticle);
    this.tagsOfArticle = this.tagsOfArticle.filter(t => t.title !== tag.title);
    this.removedTagsOfArticle.push(tag);
  }

  createAndDeleteTags(): Observable<boolean> {
    return new Observable<boolean>(() => {
      this.createTags().subscribe();
      this.deleteTags().subscribe();
    });
  }

  createTags(): Observable<boolean> {
    return new Observable<boolean>(() => {
      this.tagsOfArticle.forEach(tag => {
        this.articleService.addTag(tag).subscribe();
      });
    });
  }

  deleteTags(): Observable<boolean> {
    return new Observable<boolean>(() => {
      this.tagsOfArticle.forEach(tag => {
        this.articleService.removeTag(tag).subscribe();
      });
    });
  }

}

