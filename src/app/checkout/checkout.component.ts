import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CartService } from "../cart.service";

import type { Game } from "../game.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  paymentMethod: "credit-cart" | "paypal" = "credit-cart";
  checkout = false;

  cc_data = new FormGroup({
    name: new FormControl("", Validators.required),
    num: new FormControl("", Validators.required),
    exp_day: new FormControl("", Validators.required),
    exp_month: new FormControl("", Validators.required),
    sec: new FormControl("", Validators.required),
  });

  paypal_data = new FormGroup({
    correo: new FormControl("", Validators.required),
  });

  constructor(private router: Router, public cartService: CartService) { }

  ngOnInit(): void {
    if (this.cartService.isEmpty) {
      this.router.navigate(["/"]);
    }
  }

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

  changePaymentMethod(val: any) {
    this.paymentMethod = val;
  }

  paynow() {
    this.checkout = true;
    this.cartService.cleanCart();
  }

  regresar() {
    this.router.navigate(["/"]);
  }
}
