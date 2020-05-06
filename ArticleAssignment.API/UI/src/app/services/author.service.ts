import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Author } from '../models/author.model';
import { EMPTY, Subject } from 'rxjs';
import { CRUDLService } from '../frame/crudl.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends CRUDLService<Author> {
  
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'Author');
  }



  // listAll(action = 'ListAll') :Author[]{
  //   const resultSubscription = this.listAllAsync(action);
  //   resultSubscription.subscribe(
  //     list => {
  //       this.authorList = list;
  //       this.authorListChanged.next(this.authorList);
  //       console.log(' this.authorList',  this.authorList);
        
  //       return this.authorList;
  //     },
  //     error => {
                 
  //       console.log('An error:', error);
  //       console.log(error.Message)
  //     }
  //   );    
  //   return null;
  // }

  // listAllAsync(action = 'ListAll', params: HttpParams = null) {
  //   return this.httpClient.get<Author[]>(this.apiUrl + 'Author/' + action, { withCredentials: false, observe: 'body', responseType: 'json', params: params }).pipe(
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
  

  // search(action = 'Search') :Author[]{
  //   const resultSubscription = this.listAllAsync(action);
  //   resultSubscription.subscribe(
  //     list => {
  //       this.authorList = list;
  //       this.authorListChanged.next(this.authorList);
  //       console.log(' this.authorList',  this.authorList);
        
  //       return this.authorList;
  //     },
  //     error => {
                 
  //       console.log('An error:', error);
  //       console.log(error.Message)
  //     }
  //   );    
  //   return null;
  // }


  // searchAsync(action = 'Search', params: HttpParams = null) {
  //   return this.httpClient.get<Author[]>(this.apiUrl + 'Author/' + action, { withCredentials: false, observe: 'body', responseType: 'json', params: params }).pipe(
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
