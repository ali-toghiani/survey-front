import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse, HttpStatusCode
} from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {catchError} from "rxjs/operators";

@Injectable()
export class ResponseNotificationInterceptor implements HttpInterceptor {

  constructor(
    private notificationService: NzNotificationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.body?.message && event.body.success) {
              if (request.method !== 'GET') {
                this.notificationService.success('ثبت موفق', event.body.message);
              }
            }
          }
        }
      ),
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.status !== HttpStatusCode.Forbidden && error.status !== 0) {
          if (error.error.errors && Array.isArray(error.error.errors)) {
            error.error.errors.forEach(element => {
              this.createErrorNotification(element);
            });
          }
          if (error.error.errors && typeof error.error.errors === 'string') {
            this.createErrorNotification(error.error.errors);
          } else if (!error.error.errors) {
            this.createErrorNotification(error.error.message || error.message)
          }
        }
        return throwError(() => error);
      })
    );
  }

  createErrorNotification(errorMessage: string): void{
    this.notificationService.create(
      "error",
      "خطا",
      errorMessage
    )
  }
}
