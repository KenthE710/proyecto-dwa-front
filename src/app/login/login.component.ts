import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

import { UserService } from "../user.service";
import { SessionService } from "../session.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  usuarioLogin = new FormGroup({
    user: new FormControl("", Validators.required),
    pass: new FormControl("", Validators.required),
  });

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private sessionService: SessionService
  ) { }

  goToSignup() {
    this.router.navigate(["/signup"]);
  }

  private openSnackbar(m: string) {
    this._snackBar.open(m, "cerrar", { duration: 5000 });
  }

  onSubmit() {
    const { user: i_user, pass: i_pass } = this.usuarioLogin.value;
    const user = this.userService.findUserByUsername(i_user!);
    console.log(user);

    if (user === undefined) {
      this.openSnackbar("usuario no existe");
      return;
    }
    if (user.password !== i_pass!) {
      this.openSnackbar("Contraseña incorrecta");
      return;
    }

    this.sessionService.login(user);
    this.router.navigate(["/"]);
  }
}
