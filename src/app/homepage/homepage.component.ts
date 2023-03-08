import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { SessionService } from "../session.service";
import { CartService } from "../cart.service";
import { GameService } from "../game.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent {
  game_filter = "";

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private cartService: CartService,
    public gameService: GameService
  ) { }

  isLogin() {
    return this.sessionService.isLogged();
  }
  isAdmin() {
    return this.sessionService.getLoggedUser().admin;
  }

  logout() {
    this.sessionService.logout();
    this.cartService.cleanCart();
  }

  getCartQuantity() {
    return this.cartService.quantity;
  }

  getLoggedUser() {
    return this.sessionService.getLoggedUser();
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }
  goToCart() {
    this.router.navigate(["/cart"]);
  }
  goToAdminDashboard() {
    this.router.navigate(["/admin"]);
  }
}
