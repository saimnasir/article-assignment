import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Comment } from '../models/comment.model';
import { EMPTY, Subject } from 'rxjs';
import { SearchCommentInput } from '../models/inputs/search-comment.model';
import { CRUDLService } from '../frame/crudl.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends CRUDLService<Comment> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'Comment');
  }

}
