import { ServiceBase } from './service-base';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, EMPTY } from 'rxjs';
import { CRUDService } from './crud.service';
import { catchError } from 'rxjs/operators';
import { ListParams } from './list-params.model';

export abstract class CRUDLService<T> extends CRUDService<T> {

    completeList: T[];
    completeListChanged = new Subject<T[]>();

    activelist: { data: T[], total: number } = { data: [], total: 0 };
    activelistChanged = new Subject<{ data: T[], total: number }>();

    loading = false;
    // activeList: T[];    
    // activeListChanged = new Subject<T[]>();

    y: T & Function;
    constructor(
        protected httpClient: HttpClient,
        protected model: string
    ) {
        super(httpClient, model);  
    }

    listAll(action = 'ListAll') {
        if (this.loading) {
            return true;
        }
        const resultSubscription = this.listAllAsync(action);
        resultSubscription.subscribe(
            list => {
                this.completeList = list;
                this.completeListChanged.next(this.completeList);
            },
            error => {

                console.log('An error:', error);
                console.log(error.Message)
            }, () => this.loading = false
        );
        return null;
    }

    listAllAsync(action = 'ListAll', params = null) {
        return this.httpClient.get<T[]>(this.baseRoute + action, { withCredentials: false, observe: 'body', responseType: 'json', params: params }).pipe(
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

    search(input: any) {
        const resultSubscription = this.searchAsync(input);
        resultSubscription.subscribe(
            list => {
                this.activelist.data = list;
                this.activelist.total = list.length;
                this.activelistChanged.next(this.activelist);
            },
            error => {

                console.log('An error:', error);
                console.log(error.Message)
            }, () => this.loading = false
        );
    }

    searchAsync(input: any, action = 'Search') {
        return this.httpClient.post<T[]>(this.baseRoute + action, input, { withCredentials: false, observe: 'body', responseType: 'json' }).pipe(
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

    
    /* listByMaster(action = 'ListAll') {
        if (this.loading) {
            return true;
        }
        const resultSubscription = this.listAllAsync(action);
        resultSubscription.subscribe(
            list => {
                this.completeList = list;
                this.completeListChanged.next(this.completeList);
            },
            error => {

                console.log('An error:', error);
                console.log(error.Message)
            }, () => this.loading = false
        );
        return null;
    }

    listByMasterAsync(action = 'ListAll', input: any = null) {
        return this.httpClient.post<T[]>(this.baseRoute + action, input, { withCredentials: false, observe: 'body', responseType: 'json' }).pipe(
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
    */
}