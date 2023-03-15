import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { switchMap } from "rxjs";
import { AuthService } from "../_services/auth";
import { CartService } from "../_services/cart";

import { GameListItem } from "../_services/game";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {
  @Input() game!: GameListItem;
  @Output() gameAddedEvent = new EventEmitter<GameListItem>();

  loadingButton = false;

  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private auth: AuthService
  ) { }

  getStarts() {
    return Array(this.game.stars)
      .fill(true)
      .map((_, i) => i);
  }

  openSnackBar(m: string) {
    this.snackBar.open(m, "cerrar", { duration: 3000 });
  }

  addToCart() {
    if (this.auth.isAuthenticated()) {
      this.cartService
        .getCartInfo(this.auth.getUser()!.id)
        .pipe(
          switchMap((i) =>
            this.cartService.addToCart({
              quantity: 1,
              cartId: i.id,
              gameId: this.game.id,
            })
          )
        )
        .subscribe(() => {
          this.loadingButton = false;
          this.gameAddedEvent.emit(this.game);
          this.openSnackBar(`"${this.game.title}" añadido al carrito`);
        });

      this.loadingButton = true;
    } else {
      this.openSnackBar("Inicia sesión para añadir al carrito");
    }
  }
}
