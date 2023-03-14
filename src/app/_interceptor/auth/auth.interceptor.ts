import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "src/app/_services/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    return next.handle(
      !!token
        ? request.clone({
          headers: request.headers.set("Authorization", "Bearer " + token),
        })
        : request
    );
  }
}
