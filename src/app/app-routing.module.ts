import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomepageComponent } from "./homepage/homepage.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { AdminComponent } from "./admin/admin.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "cart", component: CartComponent },
  { path: "cart/checkout", component: CheckoutComponent },
  { path: "admin", component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
