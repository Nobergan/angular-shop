import { Pipe, PipeTransform } from '@angular/core';
import { ProductInterface } from '../../admin/shared/type/product.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(
    products: ProductInterface[],
    productName = ''
  ): ProductInterface[] {
    if (!productName.trim()) {
      return products;
    }

    return products.filter((product: ProductInterface) => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });
  }
}
