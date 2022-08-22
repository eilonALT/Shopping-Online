import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartState } from 'src/app/selectors/cart.selector';
import { Cart } from 'src/app/models/cart';
import { selectCategoryState } from 'src/app/selectors/category.selector';
import { setCategory } from 'src/app/actions/category.actions';

@Component({
  selector: 'app-navbar-down',
  templateUrl: './navbar-down.component.html',
  styleUrls: ['./navbar-down.component.css']
})
export class NavbarDownComponent implements OnInit {

  categories: Category[] = [];
  currentCategory: Category = new Category();

  cart$: Observable<any>;
  currentCart: any = new Cart();

  constructor(private router: Router, private categoryService: CategoryService, private store: Store) {
    this.cart$ = this.store.select(selectCartState);
    this.cart$.subscribe(cart => {
      this.currentCart = cart;
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }


  //get all categories
  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      }
    );
  }

  //get current category
  getCurrentCategory(category: Category) {
    this.currentCategory = category;
    this.store.dispatch(setCategory({ category: this.currentCategory }));
  }
}

