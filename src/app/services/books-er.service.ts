import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../model/book';
import { Observable, from } from 'rxjs';
import { map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
}


@Injectable({
  providedIn: 'root'
})
export class BooksErService {
  Book: Book[];

  postsUrl: string = "http://localhost:3000/api/books/";

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<any> {
    return this.http.get('http://localhost:3000/api/books/');
  }

  getThePost(id: number): Observable<Book> {
    // console.log(id);
    const Url = ` ${this.postsUrl}/${id} `;
    //console.log(Url);
    return this.http.get<Book>(Url);
  }

  addPost(title: string, Author: string, describtion: string, rating: string, avatar: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("Author", Author);
    postData.append("describtion", describtion);
    postData.append("rating", rating);
    postData.append("avatar", avatar, title);
    this.http
      .post<{ message: string; Book: Book }>(
        this.postsUrl,
        postData
      )
      .subscribe(responseData => {
        const Book = {
          // id: responseData.Book.id,
          title: title,
          Author: Author,
          describtion: describtion,
          rating: rating,
          avatar: avatar
        }
      });
  }


  // Delete post

  RemovePost(id: number): Observable<Book> {
    const Url = ` ${this.postsUrl}/${id} `;
    return this.http.delete<Book>(Url)
  }


  // update post
  UpdatePostRecovery(id: number): Observable<any> {
    const Url = ` ${this.postsUrl}/${id} `;
    //console.log(Url);
    return this.http.get<Book>(Url);
  }
  UpdatePost(id: number, title: string, Author: string, describtion: string, rating: string, avatar: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("Author", Author);
    postData.append("describtion", describtion);
    postData.append("rating", rating);
    postData.append("avatar", avatar, title);
    this.http
      .put<{ message: string; Book: Book }>(
        this.postsUrl + id,
        postData,
      )
      .subscribe(responseData => {
        const Book = {
          id: id,
          title: title,
          Author: Author,
          describtion: describtion,
          rating: rating,
          avatar: avatar
        }
      });

    //console.log(this.postsUrl + id)
  }

  // write your comments 
  sendComment(id, username: string, email: string, content: string) {
    const commentdata = { username: username, email: email, content: content };
    const comUrl = ` ${this.postsUrl}/${id}/comment `;
    this.http
      .post(comUrl, commentdata).subscribe(res => res);
  }

  // get comments to each single book -------------
  getComments(id: number): Observable<any> {
    const Url = ` ${this.postsUrl}/${id}/comment `;
    //console.log(Url);
    return this.http.get(Url);
  }

}
