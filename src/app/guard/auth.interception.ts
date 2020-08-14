import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../shared/services/user/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _US: UserService,
        private rt: Router
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get('noauth')) {
            return next.handle(req.clone());
        } else {
            const clonedReq = req.clone({ headers: req.headers.set('Authorization', "Bearer " + this._US.getToken()) });
           
            return next.handle(clonedReq).pipe(
                tap(
                    (event) => {

                    }, (err) => {
                        if(err.error.auth == false) {
                            this.rt.navigate(['/sign-in']);
                        }
                    }
                )
            )
        }
        
    }
}