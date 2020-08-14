import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogvalidatorService } from 'src/app/shared/formvalidators/logvalidator.service';
import { ProductsService } from './../../../shared/services/products/products.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
  inputs: ['updateItemData'],
  outputs: ['addItem','updateItem']
})
export class AddItemsComponent implements OnInit {

  // INPUTS
  updateItemData: any;

  // OUTPUTS
  addItem = new EventEmitter;
  updateItem = new EventEmitter;

  // DECLERATONS
  alertMsg: string = null;
  // FORMS
  addItemForms: FormGroup;
  formValidation = {
    'productName': {
      'required':'Product name is required.'
    },
    'productCost': {
      'required':'Product cost is required.'
    },
    'productPrice': {
      'required':'Product price is required.'
    },
    'productQty': {
      'required':'Product quantity is requried.'
    }
  }
  formErrors = {
    'productName':'',
    'productCost':'',
    'productPrice':'',
    'productQty':''
  }

  constructor(
    private fb: FormBuilder,
    private logValidationService: LogvalidatorService,
    private _PS: ProductsService
  ) { }

  ngOnInit() {
    // CREATE FORM GROUP ON INIT
    this.addItemForms = this.fb.group({
      _id: [''],
      categoryID: [''],
      productName: ['', Validators.required],
      productCost: ['', Validators.required],
      productPrice: ['', Validators.required],
      productQty: ['', Validators.required]
    });
    // UPDATE NEW VALUES EVERYTIME FORM CONTROL CHANGES
    this.addItemForms.valueChanges.subscribe(() =>  this.logValErrors());
  }
  // If there is an id get values to input in form group
  ngOnChanges() {
    // Check if theres data to be updated
    if(this.updateItemData){
      this.addValuesToForm(this.updateItemData);
    } else {
      // It will only trigger if there is no data to be updated
      if(this.addItemForms){
        this.addItemForms.reset();
      }
    }
  }

  addValuesToForm(data){
    // Add values to forms
      this.addItemForms.get('_id').setValue(data._id);
      this.addItemForms.get('categoryID').setValue(data.categoryID);
      this.addItemForms.get('productName').setValue(data.productName);
      this.addItemForms.get('productCost').setValue(data.productCost);
      this.addItemForms.get('productPrice').setValue(data.productPrice);
      this.addItemForms.get('productQty').setValue(data.productQty);
  }

  // LOG VALIDATION ON BLUR FUNCTION
  logValErrors(){
    // PASS FORM GROUP FORM VALIDATION MESSAGE AND FORM ERRORS TO LOG VALIDATOR SERVICE
    this.logValidationService.validatorErrors(this.addItemForms, this.formValidation, this.formErrors);
  }
  // SUBMIT FUNCTION
  btnSubmit(){
    // Check if there is an id update if non add
    if(this.updateItemData){
      this._PS.updateItems(this.addItemForms.value).subscribe((res: any) => {
        console.log(res.data);
        this.updateItem.emit(res.data);
        this.alertMsg = res['message'];
        setTimeout(() => {
          this.alertMsg = null;
        }, 2000)
      }, (err: any) => {
        this.alertMsg = err.error;
        setTimeout(() => {
          this.alertMsg = null;
        }, 2000)
      })
    } else {
      // Get Category id from local storage to set value in add items form
      var categoryID = localStorage.getItem('categoryID');
      this.addItemForms.get('categoryID').setValue(categoryID);

      this._PS.addItems(this.addItemForms.value).subscribe((res: any) => {
        console.log(res.data);
        this.addItem.emit(res.data);
        this.addItemForms.reset();
        this.alertMsg = res['message'];
        setTimeout(() => {
          this.alertMsg = null
        }, 2000)
      
      }, (err: any) => {
        this.alertMsg = err.error;
        setTimeout(() => {
          this.alertMsg = null
        }, 2000)
      })
    }
  };
  // CANEL FUNCTION
  btnCancel() {
    // Reset only if there is no data to update
    if(!this.updateItemData){
      this.addItemForms.reset();
    }
    localStorage.removeItem('categoryID');
    Object.keys(this.formErrors).forEach((key) => {
      this.formErrors[key] = '';
    })
  }


}
