import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ProductsService } from './../../services/products/products.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css'],
  inputs: ['selectedItem','checkOut','total','checkNewList','updateCategory','updateItem'],
  outputs: ['pushProd','clearList','addedCategories','addedItems','addProduct','updatedItems','updatedCategory']
})
export class ModalsComponent implements OnInit {
  // INPUTS FROM PARENT
  selectedItem: any;
  checkOut: any;
  total: any;
  checkNewList: any;
  updateCategory: any;
  updateItem: any;
  // OUTPUT DATA
  pushProd = new EventEmitter;
  clearList = new EventEmitter;
  addedCategories = new EventEmitter;
  addedItems = new EventEmitter;
  addProduct = new EventEmitter;
  updatedItems = new EventEmitter;
  updatedCategory = new EventEmitter;
  // DECLARATION
  inputStats: boolean = false;
  submitStats: boolean = false;
  receiptData: any;
  changed: any;
  netTotal: any;
  vat: number;

  constructor(
    private _PS: ProductsService
  ) { }

  ngOnInit() {
  }

  onSubmittedProd(data) {
    this.pushProd.emit(data) 
  }

  onSubmitReceipt(data) {
    this.receiptData = data
    this.changed = ((this.receiptData.cash) - (this.receiptData.total - this.receiptData.discount))
    this.netTotal= (this.receiptData.total - this.receiptData.discount);
    const getVat = (this.netTotal * 0.12);
    this.vat = Math.round(getVat * 10) / 10;
  }
    onAddProduct(data) {
      console.log(data)
      this.addProduct.emit(data);
    }
    // ON ADD CATEGORY
    onAddCategory(data) {
      this.addedCategories.emit(data)
      console.log(data)
    }
    // ON ADD ITEMS
    onAddItem(data) {
      console.log(data)
      this.addedItems.emit(data)
    }
    // ON UPDATE ITEMS
    onUpdateItem(data) {
      console.log(data)
      this.updatedItems.emit(data);
    }
    // ON UPDATE CATEGORY
    onUpdateCategory(data) {
      this.updatedCategory.emit(data)
      console.log(this.updateCategory)
    }
    clearCart(){
      this.clearList.emit()
    }

}
