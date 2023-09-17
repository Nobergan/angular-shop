import { Component, Input } from '@angular/core';
import { ProductInterface } from '../admin/shared/type/product.interface';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: ProductInterface;

  constructor(private productService: ProductService) {}

  addProduct(product: ProductInterface) {
    this.productService.addProduct(product);
  }
}
