import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from '../../models/cart-product';
import { CartProductService } from 'src/app/services/cart-product.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { setCart } from 'src/app/actions/cart.actions';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  styleUrls: ['./basket-product.component.css']
})
export class BasketProductComponent {

  @Input() cartProductId: any;

  product: any;
  cartProduct: any;

  constructor(private cartProductService: CartProductService, private productsService: ProductsService,
    private cartService: CartService, private store: Store) { }

  ngOnChanges() {
    this.getProduct(this.cartProductId)
  };


  async getProduct(id: string) {
    this.cartProduct = await this.cartProductService.getCartProduct(id).toPromise()

    this.productsService.getProduct(this.cartProduct.productId).subscribe(product => {
      this.product = product
    });
  }

  amountPlus() {
    this.cartProduct.amount += 1
    this.updateCartProduct(this.cartProduct)
    this.updateCartTotalPrice(this.cartProduct.cartId, this.cartProduct.totalPrice)
  }

  amountMinus() {
    this.cartProduct.amount -= 1
    if (this.cartProduct.amount === 0) {
      this.removeCartProduct(this.cartProduct._id)
    }
    else {
      this.updateCartProduct(this.cartProduct)
      this.updateCartTotalPrice(this.cartProduct.cartId, -this.cartProduct.totalPrice)
    }
  }

  async updateCartProduct(cartProduct: any) {
    await this.cartProductService.updateCartProduct(cartProduct).toPromise()
  }

  async updateCartTotalPrice(cartId: any, price: any) {
    const oldCart = await this.cartService.getCartById(cartId).toPromise()
    if (oldCart) {
      oldCart.totalPrice += price
    }
    const newCart = await this.cartService.updateCart(oldCart).toPromise()
    this.store.dispatch(setCart({ cart: newCart }))
  }

  removeCartProduct(cartProductId: string) {
    this.cartProductService.deleteCartProduct(cartProductId).subscribe(() => {
      this.cartService.getCartById(this.cartProduct.cartId).subscribe(cart => {
        this.store.dispatch(setCart({ cart }))
      }
      )
    })
  }
}
