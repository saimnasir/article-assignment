import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleService } from './services/article.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { ArticleComponent } from './article/article/article.component';
import { UserInfoComponent } from './author/user-info/user-info.component';
import { CommentComponent } from './comment/comment/comment.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { AuthorService } from './services/author.service';
import { CommentService } from './services/comment.service';
import { TagListComponent } from './tag/tag-list/tag-list.component';
import { TagComponent } from './tag/tag/tag.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './tools/toast/toast.component';
import { AuthorComponent } from './author/author/author.component';
import { EntityHistoryComponent } from './entity/entity-history/entity-history.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ModalComponent } from './modal/modal/modal.component';
import { HoverClassDirective } from './directives/hover-class.directive';
import { NgInitDirective } from './directives/ng-init.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatSliderModule,
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatCardModule,
  MatDividerModule,
  MatGridListModule,
  MatButtonToggleModule,
  MatListModule,
  MatInputModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatSnackBarModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatChipsModule,
  MAT_CHIPS_DEFAULT_OPTIONS
} from '@angular/material';
import { AuthorEditDialogComponent } from './author/author-edit-dialog/author-edit-dialog.component';
import { HeaderToolbarComponent } from './toolbar/header-toolbar/header-toolbar.component';
import { FooterToolbarComponent } from './toolbar/footer-toolbar/footer-toolbar.component';
import { ArticleEditDialogComponent } from './article/article-edit-dialog/article-edit-dialog.component';
import { ENTER, COMMA } from '@angular/cdk/keycodes';


@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    HeaderToolbarComponent,
    FooterToolbarComponent,
    AuthorListComponent,
    ArticleComponent,
    CommentComponent,
    UserInfoComponent,
    CommentListComponent,
    TagListComponent,
    TagComponent,
    ToastComponent,
    AuthorComponent,
    EntityHistoryComponent,
    ModalComponent,
    HoverClassDirective,
    NgInitDirective,
    AuthorEditDialogComponent,
    ArticleEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule
  ],
  providers: [
    ArticleService,
    AuthorService,
    CommentService,
    FormBuilder,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    }
  ],
  entryComponents: [AuthorEditDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
