import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './home/products/products.component';
import { OrderComponent } from './home/order/order.component';
import { FoodsComponent } from './home/order/foods/foods.component';
import { DrinksComponent } from './home/order/drinks/drinks.component';
import { PopularComponent } from './home/order/popular/popular.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SalesComponent } from './home/sales/sales.component';
import { AuthGuard } from './guard/auth.guard';
import { HasUnSavedDataGuard } from './guard/has-un-saved-data.guard';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard],
    children: [
      { path: 'sales', component: SalesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'order', component: OrderComponent, canDeactivate: [HasUnSavedDataGuard],
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
