import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../_services/auth";
import { Cart, CartItemGame, CartService } from "../_services/cart";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(
    private router: Router,
    private cartService: CartService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.cartService.getCart(this.auth.getUser()!.id).subscribe((c) => {
        this.cart = c;
      });
    }
  }

  getItems() {
    return this.cart?.items ?? [];
  }

  getSubtotal() {
    return this.getItems().reduce((acc, item) => acc + item.game.price, 0);
  }

  getTaxt() {
    return this.getSubtotal() * 0.12;
  }

  getTotal() {
    return this.getSubtotal() + this.getTaxt();
  }

  removeItem(game: CartItemGame) {
    if (this.cart != null) {
      this.cartService
        .deleteFromCart({
          cartId: this.cart.id,
          gameId: game.id,
        })
        .subscribe(() => {
          if (this.cart != null) {
            this.cart.items = this.cart?.items.filter(
              (i) => i.game.id !== game.id
            );
          }
        });
    }
  }

  cartIsEmpty() {
    return this.cart == null ? true : !this.cart.items.length;
  }

  goToCheckout() {
    this.router.navigateByUrl("/cart/checkout");
  }
}
