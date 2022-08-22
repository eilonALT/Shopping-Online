import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarDownComponent } from './components/navbar/navbar-down/navbar-down.component';
import { NavbarUpComponent } from './components/navbar/navbar-up/navbar-up.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BodyComponent } from './components/body/body.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SigninComponent } from './pages/signin/signin.component';
import { BasketProductComponent } from './components/basket-product/basket-product.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './reducers/user.reducer';
import { cartReducer } from './reducers/cart.reducer';
import { productsReducer } from './reducers/products.reducer';
import { categoryReducer } from './reducers/category.reducer';
import { orderReducer } from './reducers/order.reducer';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { NewProductComponent } from './pages/admin/new-product/new-product.component';
import { OrdersHistoryComponent } from './pages/orders-history/orders-history.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarDownComponent,
    NavbarUpComponent,
    SidebarComponent,
    BodyComponent,
    SlideshowComponent,
    ProductCardComponent,
    SignupComponent,
    HomePageComponent,
    SigninComponent,
    BasketProductComponent,
    FooterComponent,
    AdminComponent,
    UpdateProductComponent,
    NewProductComponent,
    OrdersHistoryComponent,
    CreateOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: userReducer,
      cart: cartReducer,
      products: productsReducer,
      category: categoryReducer,
      order: orderReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
