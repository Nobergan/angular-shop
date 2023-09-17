import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ProductInterface } from '../../admin/shared/type/product.interface';
import { BehaviorSubject, map } from 'rxjs';
import { ProductResponseInterface } from '../../admin/shared/type/product-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  type = 'Phone';
  cartProducts: ProductInterface[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  createProduct(product: ProductInterface) {
    return this.http
      .post<ProductResponseInterface>(
        `${environment.firebaseDatabaseUrl}/products.json`,
        product
      )
      .pipe(
        map((res: ProductResponseInterface) => {
          return {
            ...product,
            id: res.name,
            date: new Date(product.date),
          };
        })
      );
  }

  getAllProducts() {
    return this.http
      .get<{ [key: string]: ProductInterface }>(
        `${environment.firebaseDatabaseUrl}/products.json`
      )
      .pipe(
        map((res) => {
          return Object.keys(res).map((key) => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date),
          }));
        })
      );
  }

  getProductById(id: string) {
    return this.http
      .get<ProductInterface>(
        `${environment.firebaseDatabaseUrl}/products/${id}.json`
      )
      .pipe(
        map((product: ProductInterface) => {
          return {
            ...product,
            id,
            date: new Date(product.date),
          };
        })
      );
  }

  deleteProductById(id: string) {
    return this.http.delete<ProductInterface>(
      `${environment.firebaseDatabaseUrl}/products/${id}.json`
    );
  }

  updateProductById(product: ProductInterface) {
    return this.http.patch<ProductInterface>(
      `${environment.firebaseDatabaseUrl}/products/${product.id}.json`,
      product
    );
  }

  setType(type: string) {
    this.type = type;
  }

  addProduct(product: ProductInterface) {
    this.cartProducts.push(product);
  }
}
