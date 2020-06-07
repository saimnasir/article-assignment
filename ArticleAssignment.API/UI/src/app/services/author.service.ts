import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Author } from '../models/author.model';
import { EMPTY, Subject, Observable } from 'rxjs';
import { CRUDLService } from '../frame/crudl.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends CRUDLService<Author> {

  loggedAuthor: Author;
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'Author');
    this.readLoggedAuthor();
  }

  readLoggedAuthor() {
    this.read(6).subscribe(result => {
      this.loggedAuthor = result;
    });
  }
}
