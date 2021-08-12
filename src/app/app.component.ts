import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.storageService.retrieve('isLoggined')?.condition ? null : this.router.navigate(['signUp']);
  }

  ngOnDestroy(): void {
    this.authService.ResetAuthorizationData();
  }
}
