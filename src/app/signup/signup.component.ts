import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService, User } from "../user.service";
import { SessionService } from "../session.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  newUser = new FormGroup({
    user: new FormControl("", Validators.required),
    pass: new FormControl("", Validators.required),
    email: new FormControl(""),
  });

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) { }

  onSubmit() {
    const { user, pass, email } = this.newUser.value;
    const newUser: User = {
      username: user!,
      password: pass!,
      email: email ?? undefined,
      admin: false,
    };

    try {
      this.userService.addUser(newUser);
      this.sessionService.login(newUser);
      this.router.navigate(["/"]);
    } catch (e) {
      const errMessage = (e as Error).message;
      this.snackbar.open(errMessage, "cerrar", { duration: 5000 });
    }
  }
}
