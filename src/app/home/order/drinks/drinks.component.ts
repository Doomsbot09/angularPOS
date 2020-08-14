import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],
  inputs: ['drinksCategory','drinksItem'],
  outputs: ['selectedProd']
})
export class DrinksComponent implements OnInit {
  // INPUT FROM PARENT
  drinksCategory: any;
  drinksItem: any;
  // OUTPUT DATA
  selectedProd = new EventEmitter;
  // DECLERATION
  itemListId: string = null;

  constructor() { }

  ngOnInit() {
  }

  // SELECT CATEGORIES FUNCTION
  selectCategories(data) {
    this.itemListId = data._id
  }
  // SELECT DRINK FUNCTION
  selectDrink(data) {
    this.selectedProd.emit(data)
  }

}
