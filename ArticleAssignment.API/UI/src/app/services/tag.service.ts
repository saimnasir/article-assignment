import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Tag } from '../models/tag.model';
import { EMPTY, Subject } from 'rxjs';
import { SearchTagInput } from '../models/inputs/search-tag.model';
import { CRUDLService } from '../frame/crudl.service';

@Injectable({
  providedIn: 'root'
})
export class TagService extends CRUDLService<Tag> {
  
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'Tag');
  }
  // tagList: Tag[];
  // tagListChanged = new Subject<Tag[]>();
  // model: 'Article';
  // constructor(private httpClient: HttpClient) private apiUrl: string) {
  // }

  // listAll(action = 'ListAll'): Tag[] {
  //   const resultSubscription = this.listAllAsync(action);
  //   resultSubscription.subscribe(
  //     list => {
  //       this.tagList = list;
  //       this.tagListChanged.next(this.tagList);
  //       console.log('returned this.tagList', this.tagList);

  //       return this.tagList;
  //     },
  //     error => {

  //       console.log('An error:', error);
  //       console.log(error.Message)
  //     }
  //   );
  //   return null;
  // }

  // listAllAsync(action = 'ListAll', params: HttpParams = null) {
  //   return this.httpClient.get<Tag[]>(this.apiUrl + 'Tag/' + action, { withCredentials: false, observe: 'body', responseType: 'json', params: params }).pipe(
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


  // search(input: SearchTagInput): Tag[] {
  //   const resultSubscription = this.searchAsync(input);
  //   resultSubscription.subscribe(
  //     list => {
  //       this.tagList = list;
  //       this.tagListChanged.next(this.tagList);

  //       console.log('returned this.tagList', this.tagList);
  //       return this.tagList;
  //     },
  //     error => {

  //       console.log('An error:', error);
  //       console.log(error.Message)
  //     }
  //   );
  //   return null;
  // }


  // searchAsync(input: SearchTagInput) {
  //   const action = 'Search';
  //   const url = this.apiUrl + 'Tag/' + action;
  //   console.log('url', url); 

  //   return this.httpClient.post<Tag[]>(this.apiUrl + 'Tag/' + action, input, { withCredentials: false, observe: 'body', responseType: 'json' }).pipe(
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

  

  // listByMaster(masterId: number): Tag[] {
  //   const resultSubscription = this.listByMasterAsync(masterId);
  //   resultSubscription.subscribe(
  //     list => {
  //       this.tagList = list;
  //       this.tagListChanged.next(this.tagList);

  //       console.log('returned this.tagList', this.tagList);
  //       return this.tagList;
  //     },
  //     error => {

  //       console.log('An error:', error);
  //       console.log(error.Message)
  //     }
  //   );
  //   return null;
  // }


  // listByMasterAsync(masterId: number) { 
  //   return this.httpClient.get<Tag[]>(this.apiUrl + 'Tag/' + 'ListByMaster/'+masterId, { withCredentials: false, observe: 'body', responseType: 'json', params: null }).pipe(
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
