import { Component, Input } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Game } from "../game.service";
import { CartService } from "../cart.service";
import { SessionService } from "../session.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {
  @Input() game!: Game;

  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private sessionService: SessionService
  ) { }

  getStarts() {
    return Array(this.game.starts)
      .fill(true)
      .map((_, i) => i);
  }

  openSnackBar(m: string) {
    this.snackBar.open(m, "cerrar", { duration: 3000 });
  }

  addToCart() {
    if (this.sessionService.isLogged()) {
      this.cartService.addToCart(this.game);
      this.openSnackBar(`"${this.game.title}" añadido al carrito`);
    } else {
      this.openSnackBar("Iniciar sesión para añadir al carrito");
    }
  }
}
