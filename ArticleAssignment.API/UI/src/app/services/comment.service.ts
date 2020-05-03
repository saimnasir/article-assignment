import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Comment } from '../models/comment.model';
import { EMPTY, Subject } from 'rxjs';
import { SearchCommentInput } from '../models/search-inputs/search-comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  commentList: Comment[];
  commentListChanged = new Subject<Comment[]>();
  model: 'Article';
  constructor(private httpClient: HttpClient , @Inject('BASE_URL') private apiUrl : string) {
  }


  listAll(action = 'ListAll') :Comment[]{
    const resultSubscription = this.listAllAsync(action);
    resultSubscription.subscribe(
      list => {
        this.commentList = list;
        this.commentListChanged.next(this.commentList);
        console.log('returned this.commentList',  this.commentList);
        
        return this.commentList;
      },
      error => {
                 
        console.log('An error:', error);
        console.log(error.Message)
      }
    );    
    return null;
  }

  listAllAsync(action = 'ListAll', params: HttpParams = null) {
    return this.httpClient.get<Comment[]>(this.apiUrl + 'Comment/' + action, { withCredentials: false, observe: 'body', responseType: 'json', params: params }).pipe(
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
  

  search(action = 'Search', input : SearchCommentInput) :Comment[]{
    const resultSubscription = this.searchAsync(action,null, input);
    resultSubscription.subscribe(
      list => {
        this.commentList = list;
        this.commentListChanged.next(this.commentList); 
        
        console.log('returned this.commentList',  this.commentList);
        return this.commentList;
      },
      error => {
                 
        console.log('An error:', error);
        console.log(error.Message)
      }
    );    
    return null;
  }


  searchAsync(action = 'Search', params: HttpParams = null,  input : SearchCommentInput) {
    console.log('SearchCommentInput :',input);
    
    params = new HttpParams().append('input.ArticleId', input.ArticleId.toString())
    return this.httpClient.get<Comment[]>(this.apiUrl + 'Comment/' + action, { withCredentials: false, observe: 'body', responseType: 'json', params: params }).pipe(
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
