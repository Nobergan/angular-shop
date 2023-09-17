import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductInterface } from '../shared/type/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { AuthResponseInterface } from '../../shared/types/auth-response.interface';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', [Validators.required]],
      title: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      info: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const product: ProductInterface = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date(),
    };

    this.productService.createProduct(product).subscribe({
      next: (res) => {},
      error: (err: any) => {
        this.submitted = false;
      },
      complete: () => {
        this.form.reset();
        this.submitted = false;
        this.router.navigate(['/']);
      },
    });
  }
}
