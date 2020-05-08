import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Article } from '../models/article.model';
import { EMPTY, Subject, Observable } from 'rxjs';
import { CRUDLService } from '../frame/crudl.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends CRUDLService<Article> {


  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'Article');
  }

  // addComment(input : CreateCommentInput){

  //   const url = this.baseRoute+ 'AddComment';
  //   return this.httpClient.post<Article[]>(url, input, { withCredentials: false, observe: 'body', responseType: 'json' }).pipe(
  //     catchError((err: HttpErrorResponse) => {             
  //       console.log('An error 1:', err);
  //       if (err.error instanceof Error) {          
  //         console.log('An error:', err);
  //         console.log('An error occured:', err.error['message']);
  //       } else {
  //         console.log(`Backend error:  status code: ${err.status}, body: ${err['message']} `);
  //       }
  //       return EMPTY;
  //     })
  //   );
  // }

}
