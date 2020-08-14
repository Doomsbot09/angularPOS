import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// IMPORTED COMPONENTS
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './home/products/products.component';
import { NavbarComponent } from './home/navbar/navbar.component';

// IMPORTED MODULES
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './home/order/order.component';
import { FoodsComponent } from './home/order/foods/foods.component';
import { DrinksComponent } from './home/order/drinks/drinks.component';
import { PopularComponent } from './home/order/popular/popular.component';
import { ModalsComponent } from './shared/modal/modals/modals.component';
import { AddToCartComponent } from './home/order/add-to-cart/add-to-cart.component';
import { CheckoutComponent } from './home/order/checkout/checkout.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddProductsComponent } from './home/products/add-products/add-products.component';
import { AddCategoryComponent } from './home/products/add-category/add-category.component';
import { AddItemsComponent } from './home/products/add-items/add-items.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SalesComponent } from './home/sales/sales.component';
import { AuthGuard } from './guard/auth.guard';
import { DatePipe } from '@angular/common';
import { TableFilterPipe } from './shared/filters/table-filter.pipe';
import { ReduceFilterPipe } from './shared/filters/reduce-filter.pipe';
import { FilterProfitPipe } from './shared/pipes/filter-profit.pipe';
import { SortPipe } from './shared/pipes/sort.pipe';
import { AuthInterceptor } from './guard/auth.interception';

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
    ErrorPageComponent,
    AddProductsComponent,
    AddCategoryComponent,
    AddItemsComponent,
    SignInComponent,
    SalesComponent,
    TableFilterPipe,
    ReduceFilterPipe,
    FilterProfitPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
