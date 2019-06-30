import { Component, OnInit } from '@angular/core';
import { BooksErService } from '../services/books-er.service';
import { Book } from '../model/book';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
declare var M: any;

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  userIsAuthenticated = false;
  userId: string;
  private authListenerSubs: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private bookserv: BooksErService, private authService: AuthService) { }
  Book: Book;
  Comments = [];
  ngOnInit() {
    this.getThePost();
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.getComment();
  }

  getThePost() {
    const id = this.route.snapshot.params['id'];
    //console.log(id);
    this.bookserv.getThePost(id).subscribe(Book => {
      this.Book = Book;
      //console.log(Book);
    })
  }

  onDelete(Book: Book) {
    if (confirm('Are you sure')) {
      const id = this.route.snapshot.params['id'];
      this.bookserv.RemovePost(id).subscribe(Book => {
        //this.Book = Book;
        this.router.navigate(["/"]);
      })
    }
  }

  onEdit() {
    this.router.navigate(["/create"]);
  }


  // send message
  onSend(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //console.log(form.value);
    const id = this.route.snapshot.params['id'];
    this.bookserv.sendComment(id, form.value.username, form.value.email, form.value.content);
    M.toast({ html: 'شكرا لارسال الرسالة الخاصة بك' })
  }


  getComment() {
    const id = this.route.snapshot.params['id'];
    this.bookserv.getComments(id).subscribe(Comments => {
      this.Comments = Comments.comments;
      console.log(Comments.comments);
    })
  }


}
