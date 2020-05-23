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
}
