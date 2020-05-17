import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { Author } from 'src/app/models/author.model';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { SearchCommentInput } from 'src/app/models/inputs/search-comment.model';
import { CommentComponent } from '../comment/comment.component';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @ViewChild(CommentComponent, { static: false }) appComment: CommentComponent;
  @Input() author: Author;
  @Input() article: Article;

  constructor(
    public articleService: ArticleService,
    public commentService: CommentService,
    public formBuilder: FormBuilder) {
  }

  top = 1;
  topCommentsCount = this.top;
  allComments: Comment[];
  showAllComments = false;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    const input = new SearchCommentInput();
    input.ArticleId = this.article.id;
    this.commentService.searchAsync(input, 'Search').subscribe(list => {
      this.allComments = list;
    });
  }

  toggleNewCommentFrom() {
    this.appComment.onCreate();
    this.showAllComments = false;
  }

  toggleComments() {
    this.showAllComments = !this.showAllComments;
  }

  comments(): Comment[] {
    if (this.allComments && !this.showAllComments) {
      return this.allComments.slice(0, this.topCommentsCount);
    } else {
      return this.allComments;
    }
  }

  commentCounts(): number {
    return this.allComments.length;
  }
}
