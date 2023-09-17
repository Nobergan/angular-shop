import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ProductInterface } from '../shared/type/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';
import { OrderInterface } from '../../shared/types/order.interface';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent implements OnInit {
  orders$: Observable<OrderInterface[]>;
  productName: string;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getAllOrders();
  }

  deleteProduct(id: string) {
    this.orderService
      .deleteOrderById(id)
      .pipe(
        switchMap(() => this.orderService.getAllOrders()),
        tap((orders: OrderInterface[]) => {
          this.orders$ = of(orders);
        })
      )
      .subscribe();
  }
}
