import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { AuthUserInterface } from '../../shared/types/auth-user.interface';
import { AuthResponseInterface } from '../../shared/types/auth-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: AuthUserInterface = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    };

    this.authService.login(user).subscribe({
      next: (res: AuthResponseInterface) => {},
      error: (err: any) => {
        this.submitted = true;
      },
      complete: () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = true;
      },
    });
  }
}
