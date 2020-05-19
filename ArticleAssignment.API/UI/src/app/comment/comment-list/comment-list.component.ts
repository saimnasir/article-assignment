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
  commentForm: FormGroup;
  newEmptyComment = new Comment();

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
    const input = new SearchCommentInput();
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

  onCreate(modal: TemplateRef<any>) {
    this.createForm();

    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'xl';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalService.open(modal, this.modalConfig);
  }

  create() {
    if (this.commentForm.valid) {
      const newComment = new Comment();
      Object.assign(newComment, this.commentForm.value);
      this.articleService.addComment(newComment).subscribe(result => {
        this.refreshList();
        this.modalService.dismissAll();
        this.top += 1;
      });
    }
    else {
      alert('forms is in valid');
    }
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

  createForm() {
    this.commentForm = new FormGroup({
      id: new FormControl(0),
      content: new FormControl(),
      authorId: new FormControl(this.author.id),
      articleId: new FormControl(this.article.id),
      entityState: new FormControl(1),
      createDate: new FormControl(new Date()),
      updateDate: new FormControl(new Date())
    });
  }

}
