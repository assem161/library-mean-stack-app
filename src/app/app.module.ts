import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from "./app-routing.module";
import { CreatebookComponent } from './createbook/createbook.component';
import { SingleBookComponent } from './single-book/single-book.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    NavComponent,
    CreatebookComponent,
    SingleBookComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
