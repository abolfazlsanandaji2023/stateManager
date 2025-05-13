import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, Observable, of } from 'rxjs';
import { Book } from '../../store/models/book.model';
interface QueryFilter {
  query: string;
  order: 'asc' | 'desc';
}
export interface wikipediaInterfaceSource {
  query: {
    search: {
      title: string;
      snippet: string;
      wordcount: number;
      pageid: number;
    }[];
  };
}
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.example.com/books'; // Replace with your actual API endpoint

  //constructor(private http: HttpClient) {}

  async getAll(): Promise<Book[]> {
    //  if(!query)
    // return of([]);
    const books$ = this.http
      .get<wikipediaInterfaceSource>(`https://en.wikipedia.org/w/api.php`, {
        params: {
          action: 'query',
          format: 'json',
          list: 'search',
          srsearch: 'abol',
          utf8: '1',
          origin: '*',
        },
      })
      .pipe(map((res) => res.query.search));
    //const books$ = this.http.get<Book[]>(this.apiUrl);
    return await lastValueFrom(books$);
    // return this.http.get<Book[]>(this.apiUrl).toPromise();
  }
  getByQuery(query: string) {
    // return this.http.get<Book[]>(this.apiUrl);
    if (!query) return of([]);
    return this.http
      .get<wikipediaInterfaceSource>(`https://en.wikipedia.org/w/api.php`, {
        params: {
          action: 'query',
          format: 'json',
          list: 'search',
          srsearch: query || 'esmail',
          utf8: '1',
          origin: '*',
        },
      })
      .pipe(map((res) => res.query.search));
  }
}
