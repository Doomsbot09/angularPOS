import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ProductsService } from './../../../shared/services/products/products.service';
import { LogvalidatorService } from 'src/app/shared/formvalidators/logvalidator.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  inputs: ['cartItems','totalItems','newInput'],
  outputs: ['receipt']
})
export class CheckoutComponent implements OnInit {
  // INPUT FROM PARENT
  cartItems: any;
  totalItems: any;
  newInput: string;
  // OUTPUT RECEIPT
  receipt = new EventEmitter;
  clearList = new EventEmitter;
  // DECLARATION
  discountValue: any;
  sales: any = [];
  // FORMS
  checkOutForm: FormGroup;
  formValidation = {
    "cash" : {
      'required':'Please input cash value.',
      'min':'Cash must not be less than to subtotal.'
    }
  }
  formErrors = {
    'cash':''
  }

  constructor(
    private fb: FormBuilder,
    private _US: UserService,
    private _PS: ProductsService,
    private logValidatorService: LogvalidatorService
  ) { }

  ngOnInit() {
    this.checkOutForm = this.fb.group({
      illiteracy: [''],
      total: [''],
      discount: [''],
      cash: ['', Validators.required]
    });
    // Updates form value everytime it changes
    this.checkOutForm.valueChanges.subscribe(() => this.logValidator());
  }
  ngOnChanges() {
    if(this.cartItems && this.totalItems){
      const total = this.totalItems;
      const ckForm = this.checkOutForm
        ckForm.get('total').setValue(total);
        ckForm.get('cash').setValidators([Validators.required, Validators.min(total)])
    }
    // Insert keys into sales
    this.sales = {
      userID: '',
      itemID: '',
      productCost: '',
      productName: '',
      productPrice: '',
      Quantity: ''
    }
  }

  // LOG VALIDATOR
  logValidator() {
    this.logValidatorService.validatorErrors(this.checkOutForm, this.formValidation, this.formErrors);
  }
  // ON SUBMIT FUNCTION
  btnSubmit() {
    // Get mapped values
    this.cartItems.filter((x) => {
      this.mapData(x);
      // Add items into sales
      this._PS.addSales(this.sales).subscribe((item: any) => {
        // Update item quantity on hand everytime item pushed into sales
        this._PS.updateItems(x).subscribe((res: any) => {
          console.log(res)
        })
      })
    })
    // Pass the data into receipt modal
    this.receipt.emit(this.checkOutForm.value)
    // Clear the validator of cash so the disable button will not be triggered when reseting the values of forms
    this.checkOutForm.get('cash').clearValidators();
    this.checkOutForm.get('illiteracy').setValue('')
    this.checkOutForm.get('cash').reset();
  }
  // ON CANCEL FUNCTION
  onCancel() {
    // Clear form value
    this.checkOutForm.get('illiteracy').setValue('')
    this.checkOutForm.get('cash').reset();
  }
  // DISCOUNT
  changeTotal() {
    const getDiscountStat = this.checkOutForm.value.illiteracy;
    if(getDiscountStat == '1') {
      const total = this.totalItems;
      const getDiscount = total * 0.05;
      this.discountValue = getDiscount;
      const discount = total - getDiscount;
      this.totalItems = '';
      this.totalItems = discount;
      this.checkOutForm.get('discount').setValue(getDiscount);
      this.checkOutForm.get('cash').setValidators([Validators.required, Validators.min(discount)])
    } else {
      this.totalItems = this.totalItems + this.discountValue;
      this.checkOutForm.get('discount').setValue('');
      this.checkOutForm.get('cash').setValidators([Validators.required, Validators.min(this.totalItems)])
    }
  }
  // MAP DATA TO INSERT IN SALES 
  mapData(a) {
    // Get userID
    var userID = this._US.getUserPayload()._id;
    this.sales.userID = userID;
      this.sales.itemID = a._id;
      this.sales.productCost = a.productCost;
      this.sales.productName = a.productName;
      this.sales.productPrice = a.productPrice;
      this.sales.Quantity = a.inputQty;
  }

}
