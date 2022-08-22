import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserState } from '../../selectors/user.selector';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { setProducts } from 'src/app/actions/products.actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user$: Observable<any>;
  user: User = new User();
  products: any = [];

  constructor(private store: Store, private router: Router, private productService: ProductsService) {
    this.user$ = this.store.select(selectUserState);
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.user.role !== 'admin') {
      this.router.navigate(['/']);
    }
    this.getProducts();
  }

  removeProduct(productId: any) {
    this.productService.delProduct(productId).subscribe(res => {
      this.getProducts();
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      }
    )
  }
  createNewProductPage() {
    this.store.dispatch(setProducts({ Products: null }));
    this.router.navigate(['/admin/new-product']);
  }
  updateProductPage(product: any) {
    this.store.dispatch(setProducts({ Products: product }));
    this.router.navigate(['/admin/update-product']);
  }
}
