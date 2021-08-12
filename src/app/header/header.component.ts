import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthorized: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private helperService: HelperService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.helperService.isLoggined$.subscribe(x => {
      this.isAuthorized = x.condition;
    });
    this.isAuthorized = this.storageService.retrieve('isLoggined')?.condition;
  }

  routeTo(path: string): void {
    path === 'login' ? this.router.navigate(['login']) : this.router.navigate(['signUp']);
  }

  async logOut(): Promise<any> {
    await this.authService.LogOut();
    this.router.navigate(['login']);
  }
}
