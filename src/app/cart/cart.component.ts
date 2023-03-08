import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { CartService } from "../cart.service";

import type { Game } from "../game.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent {
  constructor(private router: Router, public cartService: CartService) { }

  getItems() {
    console.log(this.cartService.items);
    return this.cartService.items;
  }

  getSubtotal() {
    return this.cartService.subTotal.toFixed(2);
  }

  getTaxt() {
    return this.cartService.subTotalWithTaxes.toFixed(2);
  }

  getTotal() {
    return this.cartService.total.toFixed(2);
  }

  removeItem(game: Game) {
    this.cartService.removeFromCart(game);
  }

  cartIsEmpty() {
    return this.cartService.isEmpty;
  }

  goToCheckout() {
    this.router.navigate(["/cart/checkout"]);
  }
}
