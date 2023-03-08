import { Injectable } from "@angular/core";

import type { User } from "./user.service";

const KEYS = {
  session: "eg-logged-user",
};

@Injectable({
  providedIn: "root",
})
export class SessionService {
  loggedUser: User | null = null;

  constructor() {
    this.loggedUser = this.getLocalUser();
  }

  isLogged() {
    return Boolean(this.loggedUser);
  }

  getLoggedUser(): User {
    return this.loggedUser!;
  }

  login(user: User) {
    this.loggedUser = user;
    this.saveUserLocally(user);
  }

  logout() {
    this.loggedUser = null;
    this.removeLocalUser();
  }

  private getLocalUser(): User | null {
    return JSON.parse(sessionStorage.getItem(KEYS.session)!);
  }
  private saveUserLocally(user: User) {
    sessionStorage.setItem(KEYS.session, JSON.stringify(user));
  }
  private removeLocalUser() {
    sessionStorage.removeItem(KEYS.session);
  }
}
