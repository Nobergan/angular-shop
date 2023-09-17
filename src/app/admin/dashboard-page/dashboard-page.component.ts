import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ProductInterface } from '../shared/type/product.interface';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  products$: Observable<ProductInterface[]>;
  productName: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }

  deleteProduct(id: string) {
    this.productService
      .deleteProductById(id)
      .pipe(
        switchMap(() => this.productService.getAllProducts()),
        tap((products: ProductInterface[]) => {
          this.products$ = of(products);
        })
      )
      .subscribe();
  }
}
