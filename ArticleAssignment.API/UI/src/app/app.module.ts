import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleService } from './services/article.service';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
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
import { ArticleEditComponent } from './article/article/article-edit/article-edit.component';
import { HoverClassDirective } from './directives/hover-class.directive';
import { NgInitDirective } from './directives/ng-init.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { MyTelInput, MyTel } from './article/article-list/search-article/example-tel-input-example';
@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    NavBarComponent,
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
    ArticleEditComponent,
    HoverClassDirective,
    NgInitDirective
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
    MyTelInput, MyTel
  ],
  providers: [
    ArticleService,
    AuthorService,
    CommentService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
