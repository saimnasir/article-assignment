//#region  imports

import { Component, OnInit, Input, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { ArticleService } from 'src/app/services/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { CommentListComponent } from 'src/app/comment/comment-list/comment-list.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Tag } from 'src/app/models/tag.model';
import { TagListComponent } from 'src/app/tag/tag-list/tag-list.component';
import { ArticleListComponent } from '../article-list/article-list.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CRUDActions } from 'src/app/models/enums/action.enum';
import { ArticleEditDialogComponent } from '../article-edit-dialog/article-edit-dialog.component';

//#endregion imports

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {

  @ViewChild(CommentListComponent, { static: false }) appComments: CommentListComponent;
  @ViewChild(TagListComponent, { static: false }) appTags: TagListComponent;

  @Input() container: ArticleListComponent;
  @Input() article: Article;

  articleId: number;
  author: Author;
  articleForm: FormGroup;
  modalConfig = new NgbModalConfig();
  submitted = false;


  dialogConfig = new MatDialogConfig();

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id');
    if (!this.articleId) {
      this.articleId = this.article.id;
    }
    this.authorService.read(this.article.authorId)
      .subscribe(result => {
        this.author = result;
      });

    this.dialogConfig.minHeight = '80%';
    this.dialogConfig.disableClose = false;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = false;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.onTagInputChange();
    }
  }

  showTagAddedWaring(): boolean {
    const tag = new Tag();
    tag.title = this.appTags.tagTitle;
    return this.appTags.filterArticleTagsByTitle(tag);
  }

  onUpdate() {
    this.dialogConfig.data = {
      article: this.article,
      author: this.author,
      container: this.container,
      action: CRUDActions.Update
    };
    this.dialog.open(ArticleEditDialogComponent, this.dialogConfig);
  }

  onDelete() {
    this.dialogConfig.data = {
      article: this.article,
      author: this.author,
      container: this.container,
      action: CRUDActions.Delete
    };
    this.dialog.open(ArticleEditDialogComponent, this.dialogConfig);
  }


  // update() {
  //   this.submitted = true;
  //   console.log('this.articleForm.value', this.articleForm);

  //   // stop here if form is invalid
  //   if (this.articleForm.invalid) {
  //     return;
  //   }
  //   const model = new Article();
  //   Object.assign(model, this.articleForm.value);
  //   this.articleService.update(model).subscribe(result => {
  //     this.article = result;
  //     this.appTags.createAndDeleteTags().subscribe(() => {
  //       this.appTags.refreshList();
  //     });
  //     this.modalService.dismissAll();
  //   });
  // }


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
  }

  toggleComments() {
    this.appComments.toggleComments();
  }

  commentCounts(): number {
    return this.appComments.commentCounts();
  }

  onTagInputChange() {
    this.appTags.addTag();
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.articleForm.controls; }
}
