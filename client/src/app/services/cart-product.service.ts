import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartProduct } from '../models/cart-product';

@Injectable({
  providedIn: 'root'
})
export class CartProductService {

  URL = "http://127.0.0.1:5000/cartsproducts"
  constructor(private http: HttpClient) { }

  /** GET cart products by cart id */
  getCartProduct(cartProductId: string): Observable<any> {
    let cartProduct: any = this.http.get<CartProduct[]>(`${this.URL}/${cartProductId}`)
    return cartProduct
  }

  /** UPDATE cart product  */
  updateCartProduct(cartProduct: any): Observable<any> {
    let newCartProduct: any = this.http.put<CartProduct[]>(`${this.URL}/${cartProduct._id}`, cartProduct)
    return newCartProduct
  }

  /** POST cart product */
  addCartProduct(cartProduct: any): Observable<any> {
    let newCartProduct: any = this.http.post<CartProduct[]>(`${this.URL}`, cartProduct)
    return newCartProduct
  }

  /** DELETE cart product */
  deleteCartProduct(cartProductId: string): Observable<any> {
    let cartProduct: any = this.http.delete<CartProduct[]>(`${this.URL}/${cartProductId}`)
    return cartProduct
  }

}