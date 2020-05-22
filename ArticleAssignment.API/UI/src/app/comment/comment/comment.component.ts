import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { CRUDActions } from 'src/app/models/enums/action.enum';
import { Article } from 'src/app/models/article.model';
import { AuthorService } from 'src/app/services/author.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() container: CommentListComponent;
  @Input() article: Article;
  @Input() action = CRUDActions.Read;
  @Input() comment: Comment;
  author: Author;
  model = new Comment();
  commentForm: FormGroup;
  cardClass = 'alert-info';
  modalConfig = new NgbModalConfig();

  constructor(
    private commentService: CommentService,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.createForm();
    this.authorService.read(this.article.authorId).subscribe(result => {
      this.author = result;
      this.commentForm.patchValue({ articleId: this.article.id });
      this.commentForm.patchValue({ authorId: this.author.id });
      if (this.isCreateAction()) {
        this.cardClass = 'alert-light';
      }
    });
  }

  onMouseover() {
    this.cardClass = 'alert-light';
  }

  onMouseOut() {
    if (!this.isCreateAction()) {
      this.cardClass = 'alert-info';
    }
  }

  onEdit() {
    this.action = CRUDActions.Update;
    this.createForm();
    this.cardClass = 'alert-light';
  }

  update() {
    if (this.commentForm.valid) {
      Object.assign(this.model, this.commentForm.value);
      this.commentService.update(this.model).subscribe(result => {
        this.container.refreshList();
        this.onDiscardUpdate();
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  create() {
    if (this.commentForm.valid) {
      Object.assign(this.model, this.commentForm.value);
      console.log('create: this.model', this.model);

      this.articleService.addComment(this.model).subscribe(result => {
        this.container.refreshList();
        this.action = CRUDActions.Create;
        this.createForm();
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  onDelete(modal: TemplateRef<any>) {
    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'lg';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalConfig.centered = false;
    this.modalService.open(modal, this.modalConfig);
  }

  delete() {
    this.commentService.delete(this.comment.id).subscribe(result => {
      this.container.refreshList();
      this.modalService.dismissAll();
    });
  }

  isCreateAction(): boolean {
    if (this.action === CRUDActions.Create) {
      return true;
    }
    return false;
  }

  isReadAction(): boolean {
    return this.action === CRUDActions.Read;
  }

  isUpdateAction(): boolean {
    return this.action === CRUDActions.Update;
  }

  onDiscardCreate() {
    this.commentForm.get('content').setValue(null);
  }

  onDiscardUpdate() {
    this.action = CRUDActions.Read;
    this.cardClass = 'alert-info';
  }

  createForm() {
    if (this.action === CRUDActions.Create) {
      this.commentForm = new FormGroup({
        id: new FormControl(0),
        content: new FormControl(),
        authorId: new FormControl(this.author ? this.author.id : 0),
        articleId: new FormControl(this.article ? this.article.id : 0),
        createDate: new FormControl(new Date()),
        updateDate: new FormControl(new Date()),
        entityState: new FormControl(1)
      });
    } else {
      this.commentForm = new FormGroup({
        id: new FormControl(this.comment.id),
        content: new FormControl(this.comment.content),
        authorId: new FormControl(this.comment.authorId),
        articleId: new FormControl(this.comment.articleId),
        createDate: new FormControl(this.comment.createDate),
        updateDate: new FormControl(this.comment.updateDate),
        entityState: new FormControl(this.comment.entityState)
      });
    }
  }

}
