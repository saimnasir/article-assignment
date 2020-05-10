import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { ArticleService } from 'src/app/services/article.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  deleteMode = false;

  author: Author;
  model = new Article();

  articleForm: FormGroup;

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
    this.toggleShowForm();
  }

  toggleShowForm() {
    this.createForm();
  }

  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }

  update() {
    if (this.articleForm.valid) {
      Object.assign(this.model, this.articleForm.value);

      this.articleService.update(this.model).subscribe(result => {
        this.article = result;
        this.toggleShowForm();
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  delete() {
    this.articleService.delete(this.article.id).subscribe(result => {
    });
  }


  createForm() {
    this.articleForm = new FormGroup({
      id: new FormControl(this.article.id),
      title: new FormControl(this.article.title),
      content: new FormControl(this.article.content),
      authorId: new FormControl(this.article.authorId),
      categoryId: new FormControl(this.article.categoryId),
      createDate: new FormControl(this.article.createDate),
      updateDate: new FormControl(this.article.updateDate),
      entityState: new FormControl(this.article.entityState),
      state: new FormControl(this.article.state),
    });
    this.showForm = !this.showForm;
  }

  discard() {
    this.showForm = false;
    this.deleteMode = false;
  }
}
