import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserState } from 'src/app/selectors/user.selector';
import { selectOrderState } from 'src/app/selectors/order.selector';
import { OrdersService } from 'src/app/services/orders.service';
import { setOrder } from 'src/app/actions/order.actions';


@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {

  user$: Observable<any>
  user: any;

  orders$: Observable<any>
  orders: any;


  constructor(private store: Store, private ordersService: OrdersService) {
    this.user$ = this.store.select(selectUserState)
    this.user$.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });

    this.orders$ = this.store.select(selectOrderState)
    this.orders$.subscribe(order => {
      this.orders = order;
    });
  }

  ngOnInit(): void {
    this.getUserOrders(this.user._id);
  }


  async getUserOrders(userId: string): Promise<any> {
    try {
      const order = await this.ordersService.getOrder(userId).toPromise();
      if (order) {
        this.store.dispatch(setOrder({ order: order }));
        this.orders = order
        console.log(this.orders);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
