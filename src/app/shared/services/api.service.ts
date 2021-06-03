import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { StorageService } from '../../views/login/services/storage.service';


@Injectable()
export abstract class ApiService {

    protected base_url: string;

    constructor(private http: HttpClient, private storage: StorageService, @Inject(String) private entity: string) {
        this.base_url = environment.API_URL;
    }

    public create(data: Record<string, any>): Observable<any> {
        return this.http.post(`${this.base_url}/${this.entity}/`, data, {
            headers: { Authorization: `JWT ${this.storage.user.token}` },
        });
    }

    public readAll(
        page?: number,
        limit?: number,
        extra?: Record<string, string>
    ): Observable<any> {
        let params = new HttpParams({ fromObject: extra }); //Are not used because there isn't pagintion in the back end yet.

        if (page != undefined) params = params.set('page', `${page}`);
        if (limit != undefined) params = params.set('limit', `${limit}`);

        return this.http.get(`${this.base_url}/${this.entity}/`, {
            headers: { Authorization: `JWT ${this.storage.user.token}` },
        });
    }

    public readById(id: number): Observable<any> {
        return this.http.get(`${this.base_url}/${this.entity}/${id}/`, {
            headers: { Authorization: `JWT ${this.storage.user.token}` },
        });
    }

    public update(id: number, data: any): Observable<any> {
        return this.http.put(`${this.base_url}/${this.entity}/${id}/`, data, {
            headers: { Authorization: `JWT ${this.storage.user.token}` },
        });
    }

    public partialUpdate(id: number, data: any): Observable<any> {
        return this.http.patch(`${this.base_url}/${this.entity}/${id}/`, data, {
            headers: { Authorization: `JWT ${this.storage.user.token}` },
        });
    }

    public delete(id: number): Observable<any> {
        return this.http.delete(`${this.base_url}/${this.entity}/${id}/`, {
            headers: { Authorization: `JWT ${this.storage.user.token}` },
        });
    }
}

