import { Component, OnInit, HostListener } from '@angular/core';
import { ProductsService } from './../../shared/services/products/products.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.min.js';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {

  // DECLARATIONS
  itemList: any = [];
  foodCategory: any = [];
  drinkCategory: any = [];
  checkNewList: string = null;
  cart: any = [];
  total: any;
  subTotal: any = [];
  selectedItem: any;
  refreshData: boolean = false;
  router: string;
  newArray: any = [];
  exit: boolean = false;
  constructor(
    private _PS: ProductsService,
    private _rt: Router,
  ) { }
  // Check transaction if finished before reloading
  @HostListener('window:beforeunload',['event'])
  unloadNotification(){
    if(this.cart.length != 0) {
     var isConfirm = confirm();
      if(isConfirm){
        return true
      } else {
        return false
      }
    } else {
     return true
    }
  }

  ngOnInit() {
    // GET PRODUCTS CATEGORIES
    this._PS.getCategories().subscribe((res: any) => {
        // FILTER AND PUSH PRODUCTS THAT BELONGS TO EACH CATEGORIES
        res.filter((a) => {
          if(a.productTypeID === '5f2240e7c8425077603cd79b') {
            this.foodCategory.push(a)
          } else {
            this.drinkCategory.push(a)
          }
        })
    })
    // GET PRODUCT LIST
    this._PS.getItems().subscribe((res: any) => {
      this.itemList = res;
    })
  }
  // Check transaction if finished before leaving
  canExit(): boolean {
    // Check cart if not empty
    let x = this.cart.length
      // If cart is not empty pop up alert
      if(x != 0) {
        // Return the returned value of alert
       return Swal.fire({
         title: `Transaction's not finished`,
         text: 'Do you want to leave this page? If yes cart will be cleared.',
         icon: 'warning',
         showCancelButton: true,
         allowOutsideClick: false,
         cancelButtonText: 'No',
         confirmButtonText:'Yes!'
       }).then((isConfirm) => {
         if(isConfirm.value){
          return true
         } else {
           return false
         }
       })
      } 
      // If cart is empty return true
      else {
        return true
      }
  }
  // USED TO HIDE AND SHOW COMPONENT IF URL IS EQUAL TO THE CURRENT URL
  hasRoute(route: string) {
   return this._rt.url.includes(route);
  }

  // OUTPUT FUNCTION FROM FOOD COMPONENT
  onSelect(data: any) {
    this.selectedItem = data
  }
  // OUTPUT FUNCTION FROM MODALS
  onPushed(data: any) {
    // Insert input qty from modal in selectedItem
    this.selectedItem.inputQty = data.inputQty
    var pushedItem = this.selectedItem
    // Check cart if empty direct push if not check the item if it's already existing
    if(this.cart.length > 0) {
      this.cart.push(pushedItem)
      // Get all the duplicate items
      let x = this.cart.filter(a => {
        if(a._id == pushedItem._id) {
          return a
        } else {
          return null
        }
      })
      // Remove the duplicated item and add the quantity
      if(x.length === 2){
        x[0].inputQty += x[1].inputQty;
        const index = this.cart.length - 1;
        this.cart.splice(index, 1);
      }

    } else {
      this.cart.push(pushedItem)
    }
    // Clear subtotal data before pushing new products
    this.subTotal = []
    this.cart.filter((a) => {
      this.subTotal.push(a.productPrice * a.inputQty)
    });
    this.total = this.subTotal.reduce((a,b) => a + b)

    // UPDATE THE QUANTITY EVERYTIME THE USER ADD A PRODUCT INTO CART
    const a = this.selectedItem;
    this.selectedItem.productQty = a.productQty - data.inputQty;
  }
  // CLEAR CART AFTER CHECKOUT
  onClear(){
    this.cart = [];
    this.total = [0];
  }
  // CHECK NEW LIST
  checkOut() {
    this.checkNewList = "clear"
  }
  // CLEAR LIST FUNCTION
  btnCLearList() {
    Swal.fire({
      title: 'Warning',
      text: 'Do you want to clear item list?',
      icon: 'warning',
      showCancelButton: true
    }).then((isConfirm) => {
      if(isConfirm.value) {
        // Clear cart list and total value
        this.cart = [];
        this.total = [0];
        // Get items value from db to return all original data
        this._PS.getItems().subscribe((res: any) => {
          this.itemList = res;
        })
      }
    })
  }
  
}
