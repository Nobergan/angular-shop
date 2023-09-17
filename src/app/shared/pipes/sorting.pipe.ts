import { Pipe, PipeTransform } from '@angular/core';
import { ProductInterface } from '../../admin/shared/type/product.interface';

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(products: ProductInterface[], type = '') {
    return products.filter((product: ProductInterface) => {
      return product.type == type;
    });
  }
}
