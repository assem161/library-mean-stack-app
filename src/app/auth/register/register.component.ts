import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
declare var M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status: boolean = false;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.username, form.value.email, form.value.password);
    M.toast({ html: 'لقد قمت بالتسجيل بنجاح يمكنك الان تسجيل الدخول' })
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
    M.toast({ html: 'لقد قمت بتسجل الدخول' })
  }

  clickEvent() {
    this.status = !this.status;
  }

}
