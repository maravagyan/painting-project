import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  isLogin: boolean = false;
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(24)])],
    });
   }

   get forLogin(): any { return this.loginForm.controls; }

  ngOnInit(): void {
  }

  async onLoginSubmit(): Promise<any> {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.isLogin = await this.authService.LogIn(this.loginForm.value);
    this.isLogin ? this.router.navigate(['canvas']) : null;
  }

}
