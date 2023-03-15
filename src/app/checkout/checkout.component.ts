import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../_services/auth";
import { Cart, CartItemGame, CartService } from "../_services/cart";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  paymentMethod: "credit-cart" | "paypal" = "credit-cart";
  checkout = false;
  cart: Cart | null = null;

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

  constructor(
    private router: Router,
    public cartService: CartService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.cartService.getCart(this.auth.getUser()!.id).subscribe((c) => {
        this.cart = c;
        if (!this.cart.items.length) {
          this.router.navigate(["/"]);
        }
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

  changePaymentMethod(val: any) {
    this.paymentMethod = val;
  }

  paynow() {
    if (this.cart != null) {
      this.checkout = true;
      this.cartService.cleanCart(this.cart.id).subscribe();
    }
  }

  regresar() {
    this.router.navigateByUrl("/");
  }
}
