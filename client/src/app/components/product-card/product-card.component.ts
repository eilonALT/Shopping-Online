import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartProductService } from 'src/app/services/cart-product.service';
import { CartService } from 'src/app/services/cart.service';
import { Store } from '@ngrx/store';
import { setCart } from 'src/app/actions/cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any;
  currentUser: any = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private cartProductService: CartProductService, private router: Router,
    private cartService: CartService, private store: Store) { }

  ngOnInit(): void {
  }

  addToCart(product: any) {
    this.cartProductService.addCartProduct({ productId: product._id, cartId: this.currentUser.cartId }).subscribe((data: any) => {
      this.cartService.getCartById(this.currentUser.cartId).subscribe((cart: any) => {
        this.store.dispatch(setCart({ cart: cart }));
      }
      );
    })
  }

}
