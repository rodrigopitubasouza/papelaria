import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LoadingService } from '../components/loading/loading.component';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) { }

    public intercept(response: HttpRequest<HttpResponse<any>>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(response).pipe(delay(0), tap(response => {
            if(response instanceof HttpResponse){
                this.loadingService.hideLoading();
            }
        }));
    }
}