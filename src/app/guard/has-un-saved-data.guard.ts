import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderComponent } from '../home/order/order.component';

@Injectable({providedIn: 'root'})
export class HasUnSavedDataGuard implements CanDeactivate<OrderComponent> {

  canDeactivate(
    component: OrderComponent,
  ): Observable<boolean>|Promise<boolean>|boolean {
    // Get the return boolean value from canExit method
    return component.canExit();
  }
}