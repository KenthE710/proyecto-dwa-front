import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap, throwError } from "rxjs";

import { BackendApi } from "src/app/Consts";
import { Credentials, LoginDto, User } from "./types";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loginData: LoginDto | null = null;

  constructor(private http: HttpClient) { }

  private getLoginData(): LoginDto | null {
    return (
      this.loginData ?? JSON.parse(localStorage.getItem("login") as string)
    );
  }

  private saveLoginData(data: LoginDto): void {
    this.loginData = data;
    localStorage.setItem("login", JSON.stringify(data));
  }

  private deleteLoginData(): void {
    this.loginData = null;
    localStorage.removeItem("login");
  }

  isAuthenticated() {
    return !!this.getLoginData();
  }

  getUser(): User | null {
    return this.getLoginData()?.user ?? null;
  }

  getToken(): string | null {
    return this.getLoginData()?.token ?? null;
  }

  login(credentials: Credentials): Observable<LoginDto> {
    return this.http
      .post<LoginDto>(BackendApi + "login", credentials, httpOptions)
      .pipe(
        tap((dto) => {
          this.saveLoginData(dto);
        })
      );
  }

  logout(): Observable<any> {
    if (this.isAuthenticated()) {
      this.deleteLoginData();
      return of("ok");
    } else {
      return throwError(() => new Error("No existe token"));
    }
  }

  signin(credentials: Credentials): Observable<any> {
    return this.http.post<string>(
      BackendApi + "signin",
      credentials,
      httpOptions
    );
  }
}
