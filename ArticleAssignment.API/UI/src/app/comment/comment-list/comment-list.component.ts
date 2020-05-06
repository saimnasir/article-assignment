import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { Author } from 'src/app/models/author.model';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { ListParams } from 'src/app/frame/list-params.model';
import { SearchCommentInput } from 'src/app/models/inputs/search-comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  constructor(public articleService: ArticleService,
    public commentService: CommentService,
    public formBuilder: FormBuilder) { }

  @Input() articleId: number;
  @Input() author: Author;

  commentForm: FormGroup;
  comments: Comment[];
  content: string = "saim";
  showCommentFrom = false;

  ngOnInit(): void {

    let input = new SearchCommentInput();
    input.ArticleId = this.articleId;

    this.commentService.searchAsync(input, 'Search').subscribe(list => {
      this.comments = list;
    });

    this.commentForm = this.formBuilder.group({
      Content: new FormControl(),
      AuthorId: new FormControl(this.author.Id),
      ArticleId: new FormControl(this.articleId)
    });

  }

  addComment() {
    let comment = new Comment();
    comment.ArticleId = this.articleId;
    comment.AuthorId = this.author.Id;
    comment.content = this.content;

    this.articleService.create<Comment>(comment, 'AddComment').subscribe(result => {
      console.log('result', result);
    });

  }

  toggleShowCommentFrom() {
    this.showCommentFrom = !this.showCommentFrom;
  }

}
