import { Component, OnInit } from '@angular/core';
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
  productLists: any = [];
  foodCategory: any = [];
  drinkCategory: any = [];
  checkNewList: string = null;
  cart: any = [];
  total: any;
  subTotal: any = [];
  selectedProduct: any;
  refreshData: boolean = false;
  router: string;
  newArray: any = [];

  constructor(
    private _PS: ProductsService,
    private _rt: Router
  ) { }

  ngOnInit() {
    // GET PRODUCTS CATEGORIES
    this._PS.getProducts().subscribe((res: any) => {
        // FILTER AND PUSH PRODUCTS THAT BELONGS TO EACH CATEGORIES
        res.filter((a: { categoryId: number; }) => {
          if(a.categoryId == 1) {
            this.foodCategory.push(a)
          } else {
            this.drinkCategory.push(a)
          }
        })
    })
    // GET PRODUCT LIST
    this.getProdListMethod();
  }
  // MAKE PRODUCT LIST METHOD TO REFRESH DATA DURING INIT OR UPDATE FUNCTION
  getProdListMethod() {
    this._PS.getProductList().subscribe((res: any) => {
      this.productLists = res
    })
  }

  // USED TO HIDE AND SHOW COMPONENT IF URL IS EQUAL TO THE CURRENT URL
  hasRoute(route: string) {
   return this._rt.url.includes(route);
  }

  // OUTPUT FUNCTION FROM FOOD COMPONENT
  onSelect(data: any) {
    this.selectedProduct = data
  }
  // OUTPUT FUNCTION FROM MODALS
  onPushed(data: any) {
    if(this.cart.length > 0) {
      this.cart.push(data)
      let x = this.cart.filter(a => {
        if(a.id == data.id) {
          return a
        } else {
          return null
        }
      })
      
      if(x.length === 2){
        x[0].inputQty += x[1].inputQty;
        const index = this.cart.length - 1;
        this.cart.splice(index, 1);
      }

    } else {
      this.cart.push(data)
    }
    
    this.subTotal = []
    this.cart.filter((a) => {
      this.subTotal.push(a.prodPrice * a.inputQty)
    });
    this.total = this.subTotal.reduce((a,b) => a + b)

    // UPDATE THE QUANTITY EVERYTIME THE USER ADD A PRODUCT INTO CART
    const a = this.selectedProduct;
    const newSelectedProduct = { id: a.id, productId: a.productId, prodName: a.prodName, price: a.price, qty: a.qty - data.inputQty };
    this._PS.updateProducts(newSelectedProduct).subscribe((res) => {
      this.selectedProduct = res;
      // GET NEW UPDATED DATA
      this.getProdListMethod();
    })
  }
  // CLEAR CART AFTER SUBMIT
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
    // PROMPT FIRST ALERT
    Swal.fire({
      title: 'Warning',
      text: 'Do you want to clear item list?',
      icon: 'warning',
      showCancelButton: true
    }).then((isConfirm) => {
      if(isConfirm.value) {
        // IF CONFIRM GET THE LIST OF PRODUCT AND UPDATE DATA
        this._PS.getProductList().subscribe((res: any) => {
          res.filter((y) => {
            this.getCart(y)
          })
          // IF SUCCESS CLEARED PROMPT SUCCESS ALERT AND CLEAR CART DATA
          Swal.fire({
            title: 'CLEARED',
            icon: 'success',
            allowOutsideClick: false
          }).then(() => {
            this.cart = [];
            this.total = [0];
          })
        })
      }
    })
  }
  // GET CART DATA METHOD
  getCart(data) {
    this.cart.filter((a, inx) => {
      if(a.id == data.id){
        const returnOldData = { id: data.id, productId: data.productId, prodName: data.prodName, price: data.price, qty: data.qty += a.inputQty }
        this._PS.updateProducts(returnOldData).subscribe((res) => {
          this.selectedProduct = res;
          // GET NEW UPDATED DATA
          this.getProdListMethod();
        })
      }
    })
  }
  
}
