import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductInterface } from '../shared/type/product.interface';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  product: ProductInterface;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.productService.getProductById(params['id']);
        })
      )
      .subscribe((product: ProductInterface) => {
        this.product = product;
        this.form = this.fb.group({
          type: [this.product.type, [Validators.required]],
          title: [this.product.title, [Validators.required]],
          photo: [this.product.photo, [Validators.required]],
          info: [this.product.info, [Validators.required]],
          price: [this.product.price, [Validators.required]],
        });
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const product: ProductInterface = {
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date(),
    };

    this.productService.updateProductById(product).subscribe({
      next: (res) => {},
      error: (err: any) => {
        this.submitted = false;
      },
      complete: () => {
        this.submitted = false;
        this.router.navigate(['/admin', 'dashboard']);
      },
    });
  }
}
