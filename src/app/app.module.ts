import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// IMPORTED COMPONENTS
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './home/products/products.component';
import { NavbarComponent } from './home/navbar/navbar.component';

// IMPORTED MODULES
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './home/order/order.component';
import { FoodsComponent } from './home/order/foods/foods.component';
import { DrinksComponent } from './home/order/drinks/drinks.component';
import { PopularComponent } from './home/order/popular/popular.component';
import { ModalsComponent } from './shared/modal/modals/modals.component';
import { AddToCartComponent } from './home/order/add-to-cart/add-to-cart.component';
import { CheckoutComponent } from './home/order/checkout/checkout.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    NavbarComponent,
    OrderComponent,
    FoodsComponent,
    DrinksComponent,
    PopularComponent,
    ModalsComponent,
    AddToCartComponent,
    CheckoutComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
