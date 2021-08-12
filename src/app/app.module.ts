import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CanvasComponent } from './canvas/canvas.component';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HelperService } from './services/helper.service';
import { CircleComponent } from './canvas/circle/circle.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    CanvasComponent,
    CircleComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    StorageService,
    HelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
