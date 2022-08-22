import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  URL = "http://127.0.0.1:5000/carts"
  constructor(private http: HttpClient) { }

  /** GET cart by id from the server */
  getCartById(id: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.URL}/${id}`)
  }

  /** UPDATE cart by id */
  updateCart(cart: any): Observable<Cart> {
    return this.http.put<Cart>(`${this.URL}/${cart._id}`, cart)
  }

}
