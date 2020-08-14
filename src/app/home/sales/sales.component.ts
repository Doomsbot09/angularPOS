import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ProductsService } from './../../shared/services/products/products.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  // DECLERATION
  dateOfSales: any = [];
  dailySales: any = [];
  selectedDailySales: any = [];
  generalSales: any = [];
  gnSalesSelByDate: any = [];
  staff: any = [];
  staffID: string = '';
  productName: string = 'Chess Meat (md)';
  searchDailyProd: string = '';
  searchGenProd: string = '';
  selectStaff: string = '';
  currDate: any = null;
  // FORMS
  optionForms: FormGroup;

  constructor(
    private _US: UserService,
    private _PS: ProductsService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    // Create Forms Group
    this.optionForms = this.fb.group({
      selectDate: [''],
      selectProdGen: [''],
      selectProdDaily: [''],
      selectStaff: ['']
    });
    // Create Current Date
    this.currDate = this.datePipe.transform(new Date(), "M/d/y");

    // Get Daily Sales
    this._PS.getSales().subscribe((res: any) => {
      res.filter((a) => {
        // Show only sale on current date
        var salesDate = this.datePipe.transform(a.Date, "M/d/y");
        // Check if sale is current if yes push to dailySales
        if(this.currDate == salesDate){
          // Get sub total and profit of each item and push to sales
          var getSubTotal = a.productPrice * a.Quantity;
          var getProfit = getSubTotal - (a.productCost * a.Quantity);
          // Insert value to total key
          a.subTotal = getSubTotal
          a.profit   = getProfit
          this.dailySales.push(a);
        }

      });
    });

    // Get General Sales
    this._PS.getSales().subscribe((res: any) => {
      // Group all product that have the same id
      res.filter((item,index) => {
        // Find unique date and push to date of sales 
        // We use month day and year of sales as basis so we transform the date format to match the data
        var uniqueDate = res.findIndex(dt => this.datePipe.transform(dt.Date, "M/d/y") == this.datePipe.transform(item.Date, "M/d/y"))
        if(uniqueDate == index){
          // Convert first before passing it to date of sales
          var date = this.datePipe.transform(item.Date, 'M/d/y');
          this.dateOfSales.push(date);
        }
        // Sort Date from the latest
        this.dateOfSales.sort((b,a) => new Date(a).getTime() - new Date(b).getTime())
        // Find the item that have the same itemID and return the index of the item
        var unique = res.findIndex(x => {
          let date1 = this.datePipe.transform(x.Date,'M/d/y');
          let date2 = this.datePipe.transform(item.Date, 'M/d/y');

          if(x.itemID === item.itemID && date1 === date2){
            return x
          }
        })
        // Push all unique item in generalSales
        if(unique == index) {
          this.generalSales.push(item)
        }
        // Get all duplicates
        else {
          // Find the id of duplicates in generalSales and return the index
          var duplicated = this.generalSales.findIndex(gen => {
            const dupDate1 = this.datePipe.transform(gen.Date, 'M/d/y');
            const dupDate2 = this.datePipe.transform(item.Date, 'M/d/y');
            if(gen.itemID == item.itemID && dupDate1 === dupDate2){
              return gen
            }
          });
          // Merge all quantity that equals to the index of duplicates
          this.generalSales[duplicated].Quantity += item.Quantity
        }
      });

      // Return items that dates are equal to the current date if selected item on dates are empty
      this.generalSales.filter(a => {
        this.getGenSales(a, this.currDate)
      });
      // Also we will set selectedDate value to the current date only if this date is existing to our date of sales
      this.dateOfSales.filter(a => {
        if(a == this.currDate){
          this.optionForms.get('selectDate').setValue(this.currDate);
        }
      })
    });

    // Get all users to pass in sales staff
    this._US.getAllUsers().subscribe((res: any) => {
      // Get users data
      res.data.filter((e) => {
        // Get staffs name
        if(e.userType !== 'Admin'){
          this.staff.push({_id: e._id, name: `${e.firstname} ${e.lastname}`})
          console.log(this.staff)
        }

        // Get all userID from sales to pass users info
        this.dailySales.filter((x) => {
          if(x.userID == e._id){
            x.fullname = `${e.firstname} ${e.lastname}`
            x.staffID  = e._id.slice(20);
          }
        })
        
      });
    })
  }

  // SELECT DATE FUNCTION 
  selectDate(){
    // Clear first all the data of arrays before pushing new data to prevent duplicate data
    this.gnSalesSelByDate = []
    // Get the selected date to filter all matched date;
    var selectedDate = this.optionForms.value.selectDate
    this.generalSales.filter(a => {
      this.getGenSales(a, selectedDate);
    })
  }
  // Get Items and Total method
  getGenSales(a,selectedDate){
    var date = this.datePipe.transform(a.Date, 'M/d/y');
      if(date == selectedDate){
        this.gnSalesSelByDate.push(a)
        // Get genSubTotal and genSubProfit
        var getGenSubTotal = a.productPrice * a.Quantity;
        var getGenSubProfit= getGenSubTotal - (a.productCost * a.Quantity)
        a.subTotal = getGenSubTotal;
        a.profit = getGenSubProfit;
      }
  }
  // FIND PRODUCTS IN GENERAL SALES
  findProdGen() {
    this.optionForms.valueChanges.subscribe((a) => {
      this.searchGenProd = this.optionForms.value.selectProdGen
    })
  }
  // FIND PRODUCTS IN DAILY SALES
  findProdDaily() {
    this.optionForms.valueChanges.subscribe((a) => {
      this.searchDailyProd = this.optionForms.value.selectProdDaily
    })
  }
  // Select Staffs Daily Products
  onSelectStaff() {
    this.staffID = this.optionForms.value.selectStaff;
    if(this.staffID == ''){
      this.selectedDailySales = [];
    } else {
      this.selectedDailySales = [];
      this.dailySales.filter(a => {
        if(a.userID == this.staffID) {
          this.selectedDailySales.push(a)
        }
      })
    }
  }
}
