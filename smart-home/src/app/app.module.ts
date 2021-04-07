import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { DevicesPageComponent } from './pages/devices-page/devices-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import {ChartModule} from 'primeng/chart';
import {PaginatorModule} from 'primeng/paginator';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';

import {MessageService} from 'primeng/api';
import { FilterService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NotFoundPageComponent,
    ProfileComponent,
    DevicesPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    TooltipModule,
    PasswordModule,
    ToggleButtonModule,
    MenuModule,
    MenubarModule,
    PaginatorModule,
    ChartModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    BrowserAnimationsModule,
  ],
  providers: [FilterService, MessageService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }
