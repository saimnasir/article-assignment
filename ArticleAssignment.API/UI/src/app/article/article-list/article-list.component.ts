import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articleList: Article[];

  firstLoad = true;
  constructor(public articleService: ArticleService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    if (!this.articleService.completeList || this.firstLoad ) {
      this.firstLoad = false;
      this.articleService.listAll();
      this.articleList = this.articleService.completeList;
    }
  }
}
