import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  
  articleList: Article[];
  
  constructor(private articleService :ArticleService) { }

  ngOnInit(): void {
    this.articleList = this.articleService.listAll();
  }


}
