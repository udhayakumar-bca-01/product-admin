import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Product } from './interfacess';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "http://localhost:3000/posts"

  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get<Product[]>(this.url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error.message);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  addProduct(payload: Product) {
    debugger
    return this.http.post(this.url, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error.message);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  updateProduct(product: Product) {
    const url = `${this.url}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error.message);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error.message);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
}
