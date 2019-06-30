import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
declare var M: any;
declare var options: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, AfterViewInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngAfterViewInit(): void {
    setTimeout(function () {
      var elem = document.querySelector('.sidenav');
      var instance = M.Sidenav.init(elem, {
        edge: 'right',
      });
    }, 0)
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
