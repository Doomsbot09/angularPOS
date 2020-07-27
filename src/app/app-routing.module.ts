import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { ProductsComponent } from './home/products/products.component';
import { OrderComponent } from './home/order/order.component';
import { FoodsComponent } from './home/order/foods/foods.component';
import { DrinksComponent } from './home/order/drinks/drinks.component';
import { PopularComponent } from './home/order/popular/popular.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/products', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'order', component: OrderComponent,
        children: [
          { path: 'foods', component: FoodsComponent },
          { path: 'drinks', component: DrinksComponent },
          { path: 'popular', component: PopularComponent }
        ]
      }
    ]
  },
  { path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
