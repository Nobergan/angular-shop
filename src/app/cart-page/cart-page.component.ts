import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ProductInterface } from '../admin/shared/type/product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderInterface } from '../shared/types/order.interface';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartProducts: ProductInterface[] = [];
  totalPrice = 0;
  added = '';

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.productService.cartProducts;
    this.cartProducts.forEach((product) => (this.totalPrice += +product.price));

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      payment: ['Cash'],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const order: OrderInterface = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date(),
    };

    this.orderService.createOrder(order).subscribe({
      next: (res) => {},
      error: (err: any) => {
        this.submitted = false;
      },
      complete: () => {
        this.form.reset();
        this.added = 'Delivery is framed';
        this.submitted = false;
      },
    });
  }

  deleteCartProduct(product: ProductInterface) {
    this.totalPrice -= +product.price;
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }
}
