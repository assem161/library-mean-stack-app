import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BooksComponent } from "./books/books.component";
import { SingleBookComponent } from "./single-book/single-book.component";
import { CreatebookComponent } from "./createbook/createbook.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuard } from "./auth/auth.guard";


const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'books', component: BooksComponent },
  { path: 'books/:id', component: SingleBookComponent },
  { path: 'edit/:id', component: CreatebookComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreatebookComponent, canActivate: [AuthGuard] },
  { path: 'Register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
