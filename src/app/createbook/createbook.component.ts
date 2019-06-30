import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { BooksErService } from '../services/books-er.service';
import { mimeType } from "./mime-type.validator";
import { ActivatedRoute } from '@angular/router';

import { Book } from '../model/book';

declare var M: any;

@Component({
  selector: 'app-createbook',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css']
})
export class CreatebookComponent implements OnInit {
  addBookForm: FormGroup;
  imagePreview: string;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private bookserv: BooksErService) { }
  Book: Book;
  mode: string;
  ngOnInit() {
    this.addBookForm = this.fb.group({
      'title': [null, [Validators.required, Validators]],
      'Author': [null, [Validators.required, Validators]],
      'describtion': [null, [Validators.required, Validators]],
      'rating': [null, [Validators.required, Validators]],
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    })

    this.getThePost();
  }

  addBook(addBookForm) {
    if (!addBookForm.title || !addBookForm.Author || !addBookForm.describtion || !addBookForm.rating) {
      //console.log('you must fill fields');
      M.toast({ html: 'you must fill all fields!' })
    } else if ((this.addBookForm.invalid)) {
      M.toast({ html: 'the form is invalid' })
    } else {
      if (this.mode == "create") {
        this.bookserv.addPost(
          this.addBookForm.value.title,
          this.addBookForm.value.Author,
          this.addBookForm.value.describtion,
          this.addBookForm.value.rating,
          this.addBookForm.value.image,
        )
      } else {
        const id = this.route.snapshot.params['id'];
        //console.log(id);
        this.bookserv.UpdatePost(
          id,
          this.addBookForm.value.title,
          this.addBookForm.value.Author,
          this.addBookForm.value.describtion,
          this.addBookForm.value.rating,
          this.addBookForm.value.image,
        )
        //console.log(addBookForm);
      }
    }
    this.addBookForm.reset();
  }

  getThePost() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.mode = "edit";
    } else {
      this.mode = "create";
    }
    //console.log(this.mode);
    //console.log(id);
    this.bookserv.getThePost(id).subscribe(Book => {
      this.Book = Book;
      //console.log(Book);
    })
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addBookForm.patchValue({ image: file });
    this.addBookForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

}
