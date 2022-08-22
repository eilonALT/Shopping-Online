import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UpdateProductComponent } from './pages/admin//update-product/update-product.component';
import { NewProductComponent } from './pages/admin//new-product/new-product.component';
import { OrdersHistoryComponent } from './pages/orders-history/orders-history.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/update-product', component: UpdateProductComponent },
  { path: 'admin/new-product', component: NewProductComponent },
  { path: 'orders-history', component: OrdersHistoryComponent },
  { path: 'checkout', component: CreateOrderComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
