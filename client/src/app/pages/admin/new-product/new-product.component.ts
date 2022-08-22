import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { selectProductState } from 'src/app/selectors/products.selector';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  product$: Observable<Product>;
  product: any = new Product();
  categories: any[] = [];
  productImage: any;

  constructor(private productService: ProductsService,
    private store: Store<any>,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.product$ = this.store.select(selectProductState);
    this.product$.subscribe(
      (data: Product) => {
        this.product = data;
      });
  }

  ngOnInit(): void {
    this.getCategories();
  }


  sendFile(event: any) {
    this.productImage = <File>event.target.files[0];
  }

  createNewProduct(form: any) {
    let newform = new FormData();
    newform.append('productName', form.value.productName);
    newform.append('categoryId', form.value.categoryId);
    newform.append('price', form.value.price);
    newform.append('image', this.productImage, this.productImage.name);

    this.productService.addProduct(newform).subscribe(
      (data: any) => {
        this.router.navigate(['/admin']);
      })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

}
