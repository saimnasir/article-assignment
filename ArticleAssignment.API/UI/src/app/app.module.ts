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

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    NavBarComponent,
    AuthorListComponent,
    ArticleComponent,
    CommentComponent,
    UserInfoComponent,
    CommentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    { provide: 'BASE_URL', useValue: 'https://localhost:44312/api/' },
    ArticleService,
    AuthorService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
