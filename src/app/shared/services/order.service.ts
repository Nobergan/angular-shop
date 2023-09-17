import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductInterface } from '../../admin/shared/type/product.interface';
import { ProductResponseInterface } from '../../admin/shared/type/product-response.interface';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';
import { OrderInterface } from '../types/order.interface';
import { OrderResponseInterface } from '../types/order-response.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private router: Router) {}

  createOrder(order: OrderInterface) {
    return this.http
      .post<OrderResponseInterface>(
        `${environment.firebaseDatabaseUrl}/orders.json`,
        order
      )
      .pipe(
        map((res: OrderResponseInterface) => {
          return {
            ...order,
            id: res.name,
            date: new Date(order.date),
          };
        })
      );
  }

  getAllOrders() {
    return this.http
      .get<{ [key: string]: OrderInterface }>(
        `${environment.firebaseDatabaseUrl}/orders.json`
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

  deleteOrderById(id: string) {
    return this.http.delete<OrderInterface>(
      `${environment.firebaseDatabaseUrl}/orders/${id}.json`
    );
  }
}
