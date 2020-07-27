import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Products } from './products.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // API SERVICE
  private baseUrl = "http://localhost:3000";
  // ERROR HANDLER
  private handleErr(errRes: HttpErrorResponse){
    if(errRes.error instanceof ErrorEvent){
      console.error("Client Side Error: ", errRes.error);
    } else {
      console.error("Server Side Error: ", errRes);
    }
    return throwError(errRes)
  }

  constructor(
    private _http: HttpClient
  ) { }

  // CREATE
  addSales(data: Products): Observable<Products[]>{
    const urlFile = 'sales';
    return this._http.post<Products[]>(`${this.baseUrl}/${urlFile}`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };
  
  // RETRIEVE
  // GET PRODUCT CATEGORY
  getProducts(): Observable<Products[]>{
    const urlFile = 'products'
    return this._http.get<Products[]>(`${this.baseUrl}/${urlFile}`, {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };
  getProductList(): Observable<Products[]>{
    const urlFile = 'productList'
    return this._http.get<Products[]>(`${this.baseUrl}/${urlFile}`, {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };
  // GET SALES
  getSales(): Observable<Products[]>{
    const urlFile = 'sales'
    return this._http.get<Products[]>(`${this.baseUrl}/${urlFile}`, {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  }

  // UPDATE 
  // PRODUCTS
  updateProducts(prod: any): Observable<Products[]>{
    const urlFile = 'productList';
    return this._http.put<Products[]>(`${this.baseUrl}/${urlFile}/${prod.id}`, JSON.stringify(prod), {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };
  // SALES
  updateSales(prod: any): Observable<Products[]>{
    const urlFile = 'sales';
    return this._http.put<Products[]>(`${this.baseUrl}/${urlFile}/${prod.id}`, JSON.stringify(prod), {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };

}
