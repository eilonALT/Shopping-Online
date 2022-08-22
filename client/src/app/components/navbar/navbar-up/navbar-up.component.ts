import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserState } from 'src/app/selectors/user.selector';
import { User } from '../../../models/user';
import { logout } from 'src/app/actions/user.actions';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { selectProductsState } from 'src/app/selectors/products.selector';
import { setProducts } from 'src/app/actions/products.actions';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { selectCategoryState } from 'src/app/selectors/category.selector';
import { setCategory } from 'src/app/actions/category.actions';


@Component({
  selector: 'app-navbar-up',
  templateUrl: './navbar-up.component.html',
  styleUrls: ['./navbar-up.component.css']
})
export class NavbarUpComponent implements OnInit {

  //use router
  category$: Observable<any>;
  currentCategory: any = new Category();

  user$: Observable<any>;
  loggedUser: User = new User();

  products: any;
  filterProducts: any;

  constructor(private router: Router,
    private store: Store,
    private userService: UserService,
    private cartService: CartService,
    private productService: ProductsService) {
    this.user$ = this.store.select(selectUserState);
    this.user$.subscribe(user => {
      this.loggedUser = user;
    });
    this.category$ = this.store.select(selectCategoryState);
    this.category$.subscribe(category => {
      this.currentCategory = category;
      console.log("here");
      this.getProductsByCategory(category._id);
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  //remove user from local storage
  logout() {
    localStorage.removeItem('user');
    alert('You have been logged out');
    this.store.dispatch(logout())
  }

  setCurrentCategory() {
    this.currentCategory = new Category();
    this.store.dispatch(setCategory({ category: this.currentCategory }));
    this.getProducts();
  }

  setFilterProducts(target: any) {
    let value = target.value;
    this.filterProducts = this.products.filter((product: any) => {
      return product.productName.toLowerCase().includes(value.toLowerCase());
    });
    this.store.dispatch(setProducts({ Products: this.filterProducts }));
  }

  navigateToAdminPage() {
    this.router.navigate(['/admin']);
  }

  //get all products
  getProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.store.dispatch(setProducts({ Products: this.products }));
      }
    )
  }

  //get products by category
  getProductsByCategory(category: string) {
    this.productService.getProductsByCategory(category).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.store.dispatch(setProducts({ Products: this.products }));
      }
    )
  }


}
