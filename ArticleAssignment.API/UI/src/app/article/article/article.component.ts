//#region  imports

import { Component, OnInit, Input, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Author, AuthorFullName } from 'src/app/models/author.model';
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

  @ViewChild(TagListComponent, { static: false }) appTags: TagListComponent;

  @Input() container: ArticleListComponent;
  @Input() article: Article;

  commentPanelOpenState = false;

  articleId: number;
  author: Author;
  articleForm: FormGroup;
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
    this.dialogConfig.width = '80%';
    this.dialogConfig.disableClose = false;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = false;
  }

  getAuthorFullName(): string {
    return AuthorFullName(this.author);
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

  onTagInputChange() {
    this.appTags.addTag();
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.articleForm.controls; }
}
