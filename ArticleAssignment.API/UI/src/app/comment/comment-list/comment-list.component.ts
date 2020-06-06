import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { Author } from 'src/app/models/author.model';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { SearchCommentInput } from 'src/app/models/inputs/search-comment.model';
import { CommentComponent } from '../comment/comment.component';
import { Article } from 'src/app/models/article.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from 'src/app/services/author.service';
import { CRUDActions } from 'src/app/models/enums/action.enum';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @ViewChild(CommentComponent, { static: false }) appComment: CommentComponent;
  @Input() article: Article;
  author: Author;
  modalConfig = new NgbModalConfig();
  top = 1;
  topCommentsCount = this.top;
  allComments: Comment[];
  showAllComments = false;
  newEmptyComment = new Comment();
  createAction = CRUDActions.Create;
  constructor(
    public articleService: ArticleService,
    public authorService: AuthorService,
    public commentService: CommentService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    const input = new SearchCommentInput('');
    input.ArticleId = this.article.id;
    this.commentService.searchAsync(input, 'Search').subscribe(list => {
      this.allComments = list;

      this.authorService.read(this.article.authorId).subscribe(result => {
        this.author = result;
        this.newEmptyComment = new Comment();
        this.newEmptyComment.articleId = this.article.id;
        this.newEmptyComment.authorId = this.author.id;
        this.newEmptyComment.content = null;
      });
    });


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

