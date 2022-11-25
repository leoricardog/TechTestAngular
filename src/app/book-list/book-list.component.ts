import {Component, OnInit} from '@angular/core';
import {BookService} from "../shared/services/book.service";
import {Observable} from "rxjs";
import {ActivatedRoute, ActivatedRouteSnapshot, ParamMap, Route, Router} from "@angular/router";
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books$ = new Observable<any>();
  filter$ = new Observable<any>();

  constructor(private service: BookService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.init()
  }

  range(n: number) {
    return [...Array(n).keys()];
  }

  showDetails(isbn: string) {
    this.router.navigateByUrl("/books/" + isbn);
  }

  init() {
    if (this.route.snapshot.queryParams['search'])
      this.books$ = this.service.search(this.route.snapshot.queryParams['search']);
    else
      this.books$ = this.service.getBooks();

    this.filter$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('search')),
    );

    this.filter$.subscribe(param => {
      if (param)
        this.books$ = this.service.search(param);
    })
  }

}
