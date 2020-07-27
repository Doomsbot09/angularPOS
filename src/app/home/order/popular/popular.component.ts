import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../../shared/services/products/products.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {

  constructor(
    private _PS: ProductsService
  ) { }

  ngOnInit() {
    this._PS.getSales().subscribe((res) => {
      console.log(res)
    })
  }

}
