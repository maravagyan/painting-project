import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  submitted: boolean = false;
  isSignUp: boolean = false;
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      last_name: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(24)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(24)])],
    });
   }

   get forSignUp(): any { return this.signUpForm.controls; }

  ngOnInit(): void {
  }

  async onSignUpSubmit(): Promise<any> {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.isSignUp = await this.authService.SetAuthorizationData(this.signUpForm.value.email, this.signUpForm.value);
    this.isSignUp ? this.router.navigate(['login']) : null;
  }
}
