import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Article } from '../models/article.model';
import { Comment } from '../models/comment.model';
import { EMPTY, Subject, Observable } from 'rxjs';
import { CRUDLService } from '../frame/crudl.service';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends CRUDLService<Article> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'Article');
  }

  addComment(model: Comment) {
    return this.httpClient.post<Article>(
      this.baseRoute + 'AddComment', model,
      {
        withCredentials: false,
        observe: 'body',
        responseType: 'json',
        params: null
      });
  }


  addTag(model: Tag) {
    return this.httpClient.post<Article>(
      this.baseRoute + 'AddTag', model,
      {
        withCredentials: false,
        observe: 'body',
        responseType: 'json',
        params: null
      });
  }


  addTags(model: Tag[]) {
    console.log('addTags', model);

    return this.httpClient.post<any>(
      this.baseRoute + 'AddTags', model,
      {
        withCredentials: false,
        observe: 'body',
        responseType: 'json',
        params: null
      });
  }

  removeTags(model: Tag[]) {
    console.log('removeTags', model);

    return this.httpClient.post<any>(
      this.baseRoute + 'RemoveTags', model,
      {
        withCredentials: false,
        observe: 'body',
        responseType: 'json',
        params: null
      });
  }


  removeTag(model: Tag) {
    return this.httpClient.post<Article>(
      this.baseRoute + 'RemoveTag', model,
      {
        withCredentials: false,
        observe: 'body',
        responseType: 'json',
        params: null
      });
  }

}
