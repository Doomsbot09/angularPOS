import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],
  inputs: ['drinksCategory','drinksProduct'],
  outputs: ['selectedProd']
})
export class DrinksComponent implements OnInit {
  // INPUT FROM PARENT
  drinksCategory: any;
  drinksProduct: any;
  // OUTPUT DATA
  selectedProd = new EventEmitter;
  // DECLERATION
  prodListId: string = null;

  constructor() { }

  ngOnInit() {
  }

  // SELECT CATEGORIES FUNCTION
  selectCategories(data) {
    this.prodListId = data.id
  }
  // SELECT DRINK FUNCTION
  selectDrink(data) {
    this.selectedProd.emit(data)
  }

}
