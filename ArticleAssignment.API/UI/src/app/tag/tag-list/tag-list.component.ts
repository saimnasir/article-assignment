import { Component, OnInit, Input } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { SearchTagInput } from 'src/app/models/inputs/search-tag.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  constructor(
    public tagService: TagService,
    private articleService: ArticleService) {

  }

  @Input() articleId: number;
  tags: Tag[];

  title: '';
  showTagFrom = false;
  ngOnInit(): void {
    const input = new SearchTagInput();
    input.ArticleId = this.articleId;
    this.tagService.searchAsync(input, 'Search').subscribe(list => {
      this.tags = list;
    });
  }

  addTag() {
    const tag = new Tag();
    tag.title = this.title;
    tag.articleId = this.articleId;
    tag.description = this.title;

    this.articleService.create<Tag>(tag, 'AddTag').subscribe(result => {
      console.log('result', result);
      this.tags.push(tag);
      this.title = '';
      this.toggleShowTagFrom();
    });
  }


  toggleShowTagFrom() {
    this.showTagFrom = !this.showTagFrom;
  }

}
