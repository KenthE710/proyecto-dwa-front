import { Injectable } from "@angular/core";
import { Game } from "./game.service";

const KEYS = {
  items: "ep-cart-items",
};

@Injectable({
  providedIn: "root",
})
export class CartService {
  items: Game[] = [];

  constructor() {
    const items = this.getLocalItems();
    if (items !== null) this.items = items;
  }

  addToCart(game: Game) {
    this.items.push(game);
    this.saveItemsLocally(this.items);
  }
  removeFromCart(game: Game) {
    this.items = this.items.filter((g) => g.title !== game.title);
    this.saveItemsLocally(this.items);
  }
  cleanCart() {
    this.items = [];
    this.saveItemsLocally([]);
  }

  get quantity() {
    return this.items.length;
  }

  get subTotal() {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }

  get subTotalWithTaxes() {
    return this.subTotal * 0.12;
  }

  get total() {
    return this.subTotal + this.subTotalWithTaxes;
  }

  get isEmpty() {
    return !Boolean(this.items.length);
  }

  private getLocalItems(): Game[] | null {
    return JSON.parse(localStorage.getItem(KEYS.items)!);
  }
  private saveItemsLocally(items: Game[]) {
    localStorage.setItem(KEYS.items, JSON.stringify(items));
  }
}
