import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Products } from './products.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // API SERVICE
  private baseUrl = environment.apiBaseUrl;
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
  // PRODUCTS
  addProducts(products: Products): Observable<Products[]>{
    const urlFile = 'addProductType';
    return this._http.post<Products[]>(`${this.baseUrl}/${urlFile}`, JSON.stringify(products), {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };
  // CATEGORY
  addCategory(products: Products): Observable<Products[]>{
    const urlFile = 'addCategory';
    return this._http.post<Products[]>(`${this.baseUrl}/${urlFile}`, JSON.stringify(products), {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };
  // ITEMS
  addItems(products: Products): Observable<Products[]>{
    const urlFile = 'addItems';
    return this._http.post<Products[]>(`${this.baseUrl}/${urlFile}`, JSON.stringify(products), {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };
  // SALES
  addSales(product: Products): Observable<Products[]>{
    const urlFile = 'addSales';
    return this._http.post<Products[]>(`${this.baseUrl}/${urlFile}`, JSON.stringify(product), {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };

  // RETRIEVE
  // PRODUCTS
  getProducts(): Observable<Products[]>{
    const urlFile = 'getProductType';
    return this._http.get<Products[]>(`${this.baseUrl}/${urlFile}`, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'NoAuth':'True'
      })
    }).pipe(catchError(this.handleErr))
  };
  // CATEGORY
  getCategories(): Observable<Products[]>{
    const urlFile = 'getCategories';
    return this._http.get<Products[]>(`${this.baseUrl}/${urlFile}`, {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };
  // ITEMS
  getItems(): Observable<Products[]>{
    const urlFile = 'getItems';
    return this._http.get<Products[]>(`${this.baseUrl}/${urlFile}`, {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };
  // SALES
  getSales(): Observable<Products[]>{
    const urlFile = 'getSales';
    return this._http.get<Products[]>(`${this.baseUrl}/${urlFile}`, {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };

  // UPDATE
  // CATEGORY
  updateCategory(products: Products): Observable<Products[]>{
    const urlFile = 'updateCategory';
    return this._http.put<Products[]>(`${this.baseUrl}/${urlFile}/${products._id}`, JSON.stringify(products), {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };
  // ITEMS
  updateItems(product: Products): Observable<Products[]>{
    const urlFile = 'updateItems';
    return this._http.put<Products[]>(`${this.baseUrl}/${urlFile}/${product._id}`, JSON.stringify(product), {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr));
  };

  // DELETE
  // CATEGORY
  deleteCategory(product: Products): Observable<Products[]>{
    const urlFile = 'deleteCategory'
    return this._http.delete<Products[]>(`${this.baseUrl}/${urlFile}/${product._id}`, {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };
  // ITEMS
  deleteItem(product: Products): Observable<Products[]>{
    const urlFile = 'deleteItem';
    return this._http.delete<Products[]>(`${this.baseUrl}/${urlFile}/${product._id}`, {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleErr))
  };

}
