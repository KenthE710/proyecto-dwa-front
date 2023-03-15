import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../_services/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  usuarioLogin = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  isLoading = false;

  constructor(private router: Router, private auth: AuthService) { }

  goToSignup() {
    this.router.navigate(["/signup"]);
  }

  onSubmit() {
    this.isLoading = true;
    this.auth.login(this.usuarioLogin.value as any).subscribe(() => {
      this.isLoading = false;
      this.router.navigateByUrl("/");
    });
  }
}
