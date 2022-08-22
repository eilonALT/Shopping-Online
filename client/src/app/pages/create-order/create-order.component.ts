import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartState } from 'src/app/selectors/cart.selector';
import { selectUserState } from 'src/app/selectors/user.selector';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  cities = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Beer Sheva', 'Ashdod', 'Rishon LeZion', 'Rehovot', 'Netanya', 'Bat Yam', 'Ramat Gan', 'Ashqelon', 'Ashkelon', 'Bnei Brak', 'Eilat', 'Givatayim', 'Hadera', 'Herzliya', 'Holon', 'Kfar Saba', 'Mevo Betar', 'Netivot',];

  //today date
  today = new Date();
  year = this.today.getFullYear();
  month = this.today.getMonth() + 1
  day = this.today.getDate();
  currentDate = ''

  user$: Observable<any>
  user: any;

  cart: any;

  constructor(private store: Store, private cartService: CartService, private orderService: OrdersService, private router: Router) {
    this.user$ = this.store.select(selectUserState)
    this.user$.subscribe(user => {
      this.user = user;
      this.getUserCart(user.cartId);
    });
  }


  ngOnInit(): void {
    this.setCurrentDate();
    console.log(this.user);

  }


  //set current date
  setCurrentDate() {
    if (this.day < 10 && this.month < 10) {
      this.currentDate = this.year + '-0' + this.month + '-0' + this.day;
    }
    else if (this.day < 10 && this.month >= 10) {
      this.currentDate = this.year + '-' + this.month + '-0' + this.day;
    }
    else if (this.day >= 10 && this.month < 10) {
      this.currentDate = this.year + '-0' + this.month + '-' + this.day;
    }
    else {
      this.currentDate = this.year + '-' + this.month + '-' + this.day;
    }
  }

  async getUserCart(cartId: string): Promise<any> {
    try {
      const cart = await this.cartService.getCartById(cartId).toPromise();
      if (cart) {
        this.cart = cart;
      }
    } catch (err) {
      console.log(err);
    }
  }

  //create order
  createOrder(form: any) {
    console.log(form.value);
    const currentOrder = {
      userId: this.user._id,
      cartId: this.user.cartId,
      totalPrice: this.cart.totalPrice,
      city: form.value.city,
      street: form.value.street,
      shippingDate: form.value.shippingDate,
      creditCard: form.value.creditCard
    }

    try {
      const order = this.orderService.addOrder(currentOrder).toPromise();
      if (order) {
        console.log(order);
        this.router.navigate(['/']);
      }
    } catch (err) {
      console.log(err);
    }
  }

}