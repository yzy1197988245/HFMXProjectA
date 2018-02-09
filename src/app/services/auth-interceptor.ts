import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isLoggedIn) {
      // Get the auth header from the service.
      const authHeader = this.auth.getAuthorizationHeader();
      // Clone the request to add the new header.
      const authReq = req.clone({headers: req.headers.set('Authorization', authHeader).set('guard', this.auth.guard)});
      // Pass on the cloned request instead of the original request.
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}


