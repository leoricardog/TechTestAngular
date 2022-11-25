import {Component, OnInit} from '@angular/core';
import {BookService} from "../shared/services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  entity$ = new Observable<any>();
  isbn: any = "";

  constructor(private service: BookService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {
    this.isbn = this.route.snapshot.paramMap.get('isbn');
    this.entity$ = this.service.getBook(this.isbn);
  }

  range(n: number) {
    return [...Array(n).keys()];
  }

  back(){
    this.router.navigateByUrl("");
  }
}
