import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../../store/books.store';
import { JsonPipe } from '@angular/common';
import { Book } from '../../store/models/book.model';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'app-books',
  imports: [JsonPipe],
  // 👇 Providing `BooksStore` at the component level.
   providers: [BooksStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  readonly store = inject(BooksStore);
  ngOnInit():  void {
    const query = this.store.filter.query;
    // 👇 Re-fetch books whenever the value of query signal changes.
    this.store.loadByQuery(query);
  }
  onSearch(key: string) {
    console.log(key);

    if (key) this.store.updateQuery(key);
    else this.store.updateQuery('');
  }
}
