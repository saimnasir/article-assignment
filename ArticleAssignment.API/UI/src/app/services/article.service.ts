import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Article } from '../models/article.model';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  articleList: Article[];
  model: 'Article';
  constructor(private httpClient: HttpClient , @Inject('BASE_URL') private apiUrl : string) {
  }


  listAll(action = 'ListAll') :Article[]{
    const resultSubscription = this.listAllAsync(action);
    resultSubscription.subscribe(
      list => {
        this.articleList = list;
        console.log(' this.articleList',  this.articleList);
        
        return this.articleList;
      },
      error => {
                 
        console.log('An error:', error);
        console.log(error.Message)
      }
    );    
    return null;
  }

  listAllAsync(action = 'ListAll', params: HttpParams = null) {
    return this.httpClient.get<Article[]>(this.apiUrl + 'Article/' + action, { withCredentials: false, observe: 'body', responseType: 'json', params: params }).pipe(
      catchError((err: HttpErrorResponse) => {             
        console.log('An error 1:', err);
        if (err.error instanceof Error) {          
          console.log('An error:', err);
          console.log('An error occured:', err.error['message']);
        } else {
          console.log(`Backend error:  status code: ${err.status}, body: ${err['message']} `);
        }
        return EMPTY;
      })
    );

  }
}
