import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor() { }

  @Input() article: Article;
  collapsed = true;
  tags: string[] = ['.net core', 'core', '.net', 'core', '.net', 'mvc', 'api', '.net core', 'core', '.net', 'mvc', 'api']



  author: Author;
  ngOnInit(): void {
    this.author = new Author();
    this.author.FirstName = 'Saim';
    this.author.MiddleName = 'Nasır';
    this.author.LastName = 'Rojivan';
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;


  }

}
