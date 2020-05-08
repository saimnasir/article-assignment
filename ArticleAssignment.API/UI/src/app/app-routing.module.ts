import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'articles', component: ArticleListComponent },
    { path: 'authors', component: AuthorListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
