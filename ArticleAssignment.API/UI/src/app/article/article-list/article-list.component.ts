import { Component, OnInit } from '@angular/core'; 
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {


  articleList: Article[];

  constructor(public articleService: ArticleService) { }

  ngOnInit(): void {
    if (!this.articleService.articleList) {
      this.articleService.listAll();
      this.articleList = this.articleService.articleList;
    }

  }


}
