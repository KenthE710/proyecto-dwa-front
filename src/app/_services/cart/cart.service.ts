import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BackendApi } from "src/app/Consts";
import { Cart, AddToCartDto, DeleteFromCartDto, CartInfo } from "./types";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) { }

  getCart(userId: number): Observable<Cart> {
    return this.http.post<Cart>(BackendApi + "cart", { userId }, httpOptions);
  }

  getCartInfo(userId: number): Observable<CartInfo> {
    return this.http.post<CartInfo>(
      BackendApi + "cart/info",
      { userId },
      httpOptions
    );
  }

  cleanCart(cartId: number): Observable<any> {
    return this.http.post<string>(
      BackendApi + "cart/clean",
      { cartId },
      httpOptions
    );
  }

  addToCart(addToCartDto: AddToCartDto): Observable<any> {
    return this.http.post<string>(
      BackendApi + "cart/add",
      addToCartDto,
      httpOptions
    );
  }

  deleteFromCart(deleteFromCartDto: DeleteFromCartDto): Observable<any> {
    return this.http.post<string>(
      BackendApi + "cart/delete",
      deleteFromCartDto,
      httpOptions
    );
  }
}
