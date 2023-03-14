import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap, throwError } from "rxjs";

import { BackendApi } from "src/app/Consts";
import { Credentials } from "./types";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) { }

  getToken() {
    return localStorage.getItem("token");
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  deleteToken() {
    localStorage.removeItem("token");
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  login(credentials: Credentials) {
    return this.http
      .post<string>(BackendApi + "login", credentials, httpOptions)
      .pipe(
        tap((token) => {
          this.saveToken(String(token));
        })
      );
  }

  logout(): Observable<any> {
    if (this.isAuthenticated()) {
      this.deleteToken();
      return of("ok");
    } else {
      return throwError(() => new Error("No existe token"));
    }
  }

  signin(credentials: Credentials): Observable<string> {
    return this.http.post<string>(
      BackendApi + "signin",
      credentials,
      httpOptions
    );
  }
}
