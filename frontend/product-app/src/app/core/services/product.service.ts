import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api = 'http://localhost:5152/api/Products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api, product);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }
  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(`${this.api}/${id}`, product);
  }
}
