import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = 'https://api.angular.schule';

  constructor(private httpClient: HttpClient) {
  }

  getBooks() {
    return this.httpClient.get(`${this.url}/books`)
      .pipe(map((results: any) => results.slice(0, 10)));
  }

  getBook(isbn: string) {
    return this.httpClient.get(`${this.url}/books/${isbn}`);
  }

  search(param: string) {
    return this.httpClient.get(`${this.url}/books/search/${param}`);
  }
}
