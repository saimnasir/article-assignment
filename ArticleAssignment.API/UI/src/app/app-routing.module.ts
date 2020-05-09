import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { AuthorComponent } from './author/author/author.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'author/:id', component: AuthorComponent },
  { path: 'author/isNew', component: AuthorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
