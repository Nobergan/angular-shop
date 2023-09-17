import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ProductInterface } from '../admin/shared/type/product.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  products$: Observable<ProductInterface[]>;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }
}
