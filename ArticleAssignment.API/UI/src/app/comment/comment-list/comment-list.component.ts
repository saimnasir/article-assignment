import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { Author } from 'src/app/models/author.model';
import { CommentService } from 'src/app/services/comment.service';
import { SearchCommentInput } from 'src/app/models/search-inputs/search-comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  constructor(public commentService: CommentService) { }

  @Input() articleId: number;
  @Input() author: Author; 

  ngOnInit(): void {
    if (!this.commentService.commentList) {
      console.log('CommentListComponent 1');

      let input = new SearchCommentInput();
      console.log('articleId', this.articleId);

      input.ArticleId = this.articleId;
      this.commentService.search('', input);
    }
    else {
      console.log('CommentListComponent 2');
    }


  }

}
