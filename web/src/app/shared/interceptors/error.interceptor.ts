import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../components/loading/loading.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private _snackBar: MatSnackBar,
        private loadingService: LoadingService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this.loadingService.hideLoading();
            if (err.status >= 400 && err.status < 500) {
                return this.messageErrorClient(err);
            } else if (err.status === 500) {
                this._snackBar.open('Ocorreu um erro inesperado! Entre em contato com o administrador.', '', {
                    duration: 4000,
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                  });
                return throwError(err);
            }
            return throwError(err);
        }));
    }

    private messageErrorClient(err): Observable<HttpEvent<any>> {
        if (err.error && err.error.messages instanceof Array && err.error.messages.length > 0) {
            return throwError(err.error);
        } else if (err.error && err.error.detail && err.error.detail instanceof Array && err.error.detail.length > 0) {
            this._snackBar.open(err.error.detail.map(det => det.message), '', {
                duration: 4000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
              });
            return throwError(err.error);
        } else if (err.error && err.error.message) {
            this._snackBar.open(err.error.message, '', {
                duration: 4000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
              });
            return throwError(err.error);
        }
        return throwError(err);
    }
}