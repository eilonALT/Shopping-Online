import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Category } from 'src/app/models/category';
import { Store } from '@ngrx/store';
import { getProducts, setProducts } from '../../actions/products.actions';
import { Observable } from 'rxjs';
import { selectProductsState } from 'src/app/selectors/products.selector';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  products$: Observable<any>;
  products: any[] = [];
  @Input() currentCategory: any = new Category();
  currentCategoryId: string = "";


  constructor(
    private router: Router,
    private productService: ProductsService,
    private store: Store<any>
  ) {
    this.products$ = this.store.select(selectProductsState);
    this.products$.subscribe(products => {
      this.products = products;
    });
  }

  // ngOnChanges() {
  //   this.currentCategoryId = this.currentCategory._id;
  //   if (this.currentCategoryId === '' || this.currentCategoryId === undefined) {
  //     this.getProducts();
  //   }
  //   else {
  //     this.getProductsByCategory(this.currentCategoryId);
  //   }
  // }

  // //get all products
  // getProducts() {
  //   this.productService.getProducts().subscribe(
  //     (data: Product[]) => {
  //       this.products = data;
  //       this.store.dispatch(setProducts({ Products: this.products }));
  //     }
  //   )
  // }

  // //get products by category
  // getProductsByCategory(category: string) {
  //   this.productService.getProductsByCategory(category).subscribe(
  //     (data: Product[]) => {
  //       this.products = data;
  //     }
  //   )
  // }


}
