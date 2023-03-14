import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BackendApi } from "src/app/Consts";
import { Cart, AddToCartDto, DeleteFromCartDto } from "./types";

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

  addToCart(addToCartDto: AddToCartDto): Observable<string> {
    return this.http.post<string>(
      BackendApi + "cart/add",
      addToCartDto,
      httpOptions
    );
  }

  deleteFromCart(deleteFromCartDto: DeleteFromCartDto): Observable<string> {
    return this.http.post<string>(
      BackendApi + "cart/delete",
      deleteFromCartDto,
      httpOptions
    );
  }
}
