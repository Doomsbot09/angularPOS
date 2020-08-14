import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
  inputs: ['foodCategory','foodItems','refreshProducts'],
  outputs: ['selectedItem']
})
export class FoodsComponent implements OnInit {
  // INPUT FROM PARENT
  foodItems: any;
  foodCategory: any = [];
  refreshProducts: any;
  // OUTPUT DATA
  selectedItem = new EventEmitter;
  // DECLARATIONS
  itemListId: string = null;
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.foodCategory)
  }

  // SELECT CATEGORIES FUNCTION
  selectCategories(data) {
    this.itemListId = data._id
  }
  // SELECT FOOD FUNCTION
  selectFood(item) {
    this.selectedItem.emit(item)
    console.log(item)
  }

}
