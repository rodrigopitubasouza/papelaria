import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export abstract class HttpCore {

    private applicationUrl = environment.applicationUrl;
    private readonly headers: HttpHeaders;

    constructor(protected httpClient: HttpClient, private controller: string) {
        this.controller = controller;
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Expose-Headers': 'Authorization'
        });
    }

    protected get<T>(endpoint: string,id?: number): Observable<T> {
        const targetEndpoint = endpoint ? `/${endpoint}` : '';
        const targetId = id ? `/${id}` : '';
        return this.httpClient.get<T>(`${this.applicationUrl}/${this.controller}${targetEndpoint}${targetId}`, { headers: this.headers });
    }

    protected post<T, R>(endpoint: string, body?: T, id?: number): Observable<R> {
        const targetEndpoint = endpoint ? `/${endpoint}` : '';
        const targetId = id ? `/${id}` : '';
        return this.httpClient.post<R>(`${this.applicationUrl}/${this.controller}${targetEndpoint}${targetId}`, body, { headers: this.headers });
    }

    protected postWithHeaders<T, R>(endpoint: string, body?: T, id?: number): Observable<HttpResponse<R>> {
        const targetEndpoint = endpoint ? `/${endpoint}` : '';
        const targetId = id ? `/${id}` : '';
        return this.httpClient.post<R>(`${this.applicationUrl}/${this.controller}${targetEndpoint}${targetId}`, body, { headers: this.headers, observe: 'response' });
    }

    protected put<T, R>(endpoint: string, body?: any, id?: number): Observable<R> {
        const targetEndpoint = endpoint ? `/${endpoint}` : '';
        const targetId = id ? `/${id}` : '';
        return this.httpClient.put<R>(`${this.applicationUrl}/${this.controller}${targetEndpoint}${targetId}`, body, { headers: this.headers });
    }

    protected delete<T>(endpoint: string, id?: string): Observable<T> {
        const targetEndpoint = endpoint ? `/${endpoint}` : '';
        const targetId = id ?`/${id}` : '';
        return this.httpClient.delete<T>(`${this.applicationUrl}/${this.controller}${targetEndpoint}${targetId}`, { headers: this.headers });
    }
}