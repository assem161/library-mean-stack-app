import { Component, OnInit } from '@angular/core';
import { BooksErService } from '../services/books-er.service';
import { Book } from '../model/book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  Books = [];

  constructor(private bookserv: BooksErService) { }

  ngOnInit() {
    this.bookserv.getPosts().subscribe(Books => {
      this.Books = Books.posts;
      //console.log(Books);
      //console.log(Books.posts)
    })
  }


}
