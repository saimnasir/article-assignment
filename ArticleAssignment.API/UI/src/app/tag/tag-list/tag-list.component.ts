import { Component, OnInit, Input } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { SearchTagInput } from 'src/app/models/inputs/search-tag.model';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  constructor(public tagService: TagService) { }

  @Input() articleId: number;
  tags: Tag[]

  ngOnInit(): void {
    let input = new SearchTagInput();
    input.ArticleId = this.articleId;
    this.tagService.searchAsync(input, 'Search').subscribe(list => {
      this.tags = list;
    });
  }

}
