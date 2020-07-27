import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ProductsService } from './../../services/products/products.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css'],
  inputs: ['selectedProd','checkOut','total','checkNewList'],
  outputs: ['pushProd','clearList']
})
export class ModalsComponent implements OnInit {
  // INPUTS FROM PARENT
  selectedProd: any;
  checkOut: any;
  total: any;
  checkNewList: any;
  // OUTPUT DATA
  pushProd = new EventEmitter;
  clearList = new EventEmitter;
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
   console.log(this.inputStats)
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
    this.clearList.emit()
    // this.checkOut.filter((x) => {
    //   this.checkSales(x)
    // })
  }
  // CHECK IF DATA IS ALREADY IN SALES
    // checkSales(data) {
    //   this._PS.getSales().subscribe((getSales: any) => {
    //     if(getSales.length > 0) {
    //       let x = getSales.filter(a => {
    //         if(data.id == a.id) {
    //           return a
    //         } else {
    //           return null              
    //         }
    //       });
    //       if(x.length !== 0){
    //         const updateData = { id: data.id, prodName: data.prodName, prodPrice: data.prodPrice, inputQty: x[0].inputQty += data.inputQty }
    //           this._PS.updateSales(updateData).subscribe((res) => {
    //             console.log(res)
    //           })
    //       } else {
    //         this._PS.addSales(data).subscribe((res) => {
    //           console.log(res)
    //         })
    //       }
    //     } else {
    //       this._PS.addSales(data).subscribe((res) => {
    //         console.log(res)
    //       })
    //     }
    //   })
    // }
  

}
