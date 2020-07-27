import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../shared/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // TABLES
  tblFoods: any = null;
  tblDrinks: any = null;
  // PRODUCTS
  products: any = [];
  productLists: any = [];

  constructor(
    private _PS: ProductsService
  ) { }

  ngOnInit() {
    // GET PRODUCT CATEGORIES
    this._PS.getProducts().subscribe(
      (res) => {
        this.products = res
    })
    // GET PRODUCT LIST 
    this._PS.getProductList().subscribe((res) => {
      this.productLists = res
    })
  }

  // LIST CLICK FUNCTION
  selectFoods(data) {
    if(this.tblFoods === null) {
      this.tblFoods = data.product;
    } else {
      this.tblFoods = null;
    }
  }

  selectDrinks(data) {
    if(this.tblDrinks === null){
      this.tblDrinks = data.product
    } else {
      this.tblDrinks = null;
    }
  }

}// END OF CLASS