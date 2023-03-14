import { Injectable } from "@angular/core";

export interface User {
  username: string;
  password: string;
  email?: string;
  admin: boolean;
}

const LS_KEYS = {
  users: "eg-users",
};
const DEF_USERS = [
  {
    username: "kenth",
    password: "123",
    email: "admin@epicgames.com",
    admin: true,
  },
];

@Injectable({
  providedIn: "root",
})
export class UserService {
  users: User[] = DEF_USERS;

  constructor() {
    const users = this.getLocalUsers();
    if (users !== null) {
      this.users = users;
    } else {
      this.saveUsersLocally(DEF_USERS);
    }
  }

  findUserByUsername(username: string) {
    return this.users.find((u) => u.username === username);
  }

  addUser(user: User) {
    if (Boolean(this.findUserByUsername(user.username)))
      throw new Error("Nombre de usuario ya en uso");
    this.users = [...this.users, user];
    this.saveUsersLocally(this.users);
  }

  private getLocalUsers(): User[] | null {
    return JSON.parse(localStorage.getItem(LS_KEYS.users)!);
  }
  private saveUsersLocally(users: User[]) {
    localStorage.setItem(LS_KEYS.users, JSON.stringify(users));
  }
}
