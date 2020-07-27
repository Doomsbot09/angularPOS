import { Component, OnInit, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.min.js';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
  inputs: ['foodCategory','foodProducts','refreshProducts'],
  outputs: ['selectedProd']
})
export class FoodsComponent implements OnInit {
  // INPUT FROM PARENT
  foodProducts: any;
  foodCategory: any;
  refreshProducts: any;
  // OUTPUT DATA
  selectedProd = new EventEmitter;
  // DECLARATIONS
  prodListId: string = null;
  
  constructor() { }

  ngOnInit() {

  }

  // SELECT CATEGORIES FUNCTION
  selectCategories(data) {
    this.prodListId = data.id
  }
  // SELECT FOOD FUNCTION
  selectFood(item) {
    this.selectedProd.emit(item)
    if(item.qty == 0) {
      Swal.fire({
        title: 'Out of Stock',
        icon: 'error'
      })
    }
  }

}
