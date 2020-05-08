import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService) { }

  @Input() article: Article;
  collapsed = true;
  showForm = false;

  author: Author;
  ngOnInit(): void {
    this.authorService.read(this.article.authorId).subscribe(author => {
      this.author = author;
    });
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  onEdit() {
    if (this.collapsed === true) {
      this.toggleCollapse();
    }
    this.toggleShowFrom();
  }

  toggleShowFrom() {
    this.showForm = !this.showForm;
  }
  update() {
    console.log('update article', this.article);

    this.articleService.update(this.article).subscribe(result => {
      this.toggleShowFrom();
    });
  }

  delete() {
    this.articleService.delete(this.article.id).subscribe(result => {
    });
  }
}
