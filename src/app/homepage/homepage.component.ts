import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../_services/auth";
import { CartService } from "../_services/cart";
import { GameListItem, GameService } from "../_services/game";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit {
  game_filter = "";
  games: GameListItem[] = [];
  cartQuantity: number = 0;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cartService: CartService,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.getGamesList().subscribe((g) => {
      this.games = g;
    });
    this.getCartQuantity();
  }

  private getCartQuantity() {
    if (this.auth.isAuthenticated()) {
      this.cartService.getCartInfo(this.auth.getUser()!.id).subscribe((i) => {
        this.cartQuantity = i.items;
      });
    }
  }

  gameAddToCartEventHandle(_game: GameListItem) {
    this.getCartQuantity();
  }

  isLogin() {
    return this.auth.isAuthenticated();
  }

  isAdmin() {
    return false;
  }

  logout() {
    this.auth.logout();
  }

  getLoggedUser() {
    return this.auth.getUser();
  }

  goToLogin() {
    this.router.navigateByUrl("/login");
  }
  goToCart() {
    this.router.navigateByUrl("/cart");
  }
  goToAdminDashboard() {
    this.router.navigateByUrl("/admin");
  }
}
