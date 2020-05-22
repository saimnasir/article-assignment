import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { SearchTagInput } from 'src/app/models/inputs/search-tag.model';
import { Article } from 'src/app/models/article.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
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
  tagTitle: string;
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
    });

    this.tagService.listAllAsync().subscribe(allTags => {
      this.availableTags = allTags.filter(t => this.filterArticleTagsById(t));
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

  addTag() {
    if (this.autoCompleteModel instanceof Object) {
      this.tagTitle = this.autoCompleteModel.title;
    } else {
      this.tagTitle = this.autoCompleteModel;
    }
    if (this.tagTitle) {
      const model = new Tag();
      model.articleId = this.article.id;
      model.title = this.tagTitle;
      model.createDate = new Date();
      model.updateDate = new Date();
      model.description = this.tagTitle;
      if (!this.filterArticleTagsByTitle(model)) {
        this.tagsOfArticle.push(model);
        this.tagTitle = null;
        this.autoCompleteModel = null;
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

