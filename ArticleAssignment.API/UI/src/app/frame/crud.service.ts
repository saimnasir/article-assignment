import { ServiceBase } from './service-base';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export abstract class CRUDService<T> extends ServiceBase {
    baseRoute: string;
    currentItem: T;
    constructor(
        protected httpClient: HttpClient,
        protected model: string
    ) {
        super();
        this.baseRoute = `${environment.baseRoute}/${model}/`;
    }

    create(model: T, action = 'Create') {
        console.log('T model', model);

        return this.httpClient.post<T>(
            this.baseRoute + action, model,
            {
                withCredentials: false,
                observe: 'body',
                responseType: 'json',
                params: null
            });
    }

    read(id: number, action = 'Read'): Observable<T> {
        const params = new HttpParams().set('id', id.toString());
        return this.httpClient.get<T>(
            this.baseRoute + action,
            {
                withCredentials: false,
                observe: 'body',
                responseType: 'json',
                params
            });
    }

    update(model: T, action = 'Update') {
        console.log('Model T', model);

        return this.httpClient.put<T>(
            this.baseRoute + action, model,
            {
                withCredentials: false,
                observe: 'body',
                responseType: 'json',
                params: null
            });
    }

    delete(id: number, action = 'Delete') {
        const params = new HttpParams().set('id', id.toString());
        return this.httpClient.delete<T>(
            this.baseRoute + action,
            {
                withCredentials: false,
                params
            });
    }

}
