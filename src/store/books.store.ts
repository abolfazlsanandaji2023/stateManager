import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Book } from './models/book.model';
import { computed, InjectionToken } from '@angular/core';

type BooksState = {
  books: Book[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BooksState = {
  books: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BooksStore = signalStore(
     // 👇 Providing `BooksStore` at the root level.
  { providedIn: 'root' },
  withState(initialState),
  // 👇 Accessing previously defined state signals and properties.
  withComputed(({ books, filter }) => ({
    booksCount: computed(() => books().length),
    sortedBooks: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return books().slice().sort((a, b) =>
        direction * a.title.localeCompare(b.title)
      );
    }),
  }))
);

// const BOOKS_STATE = new InjectionToken<BooksState>('BooksState', {
//     factory: () => initialState,
//   });
//   const BooksStore = signalStore(
//     withState(() => inject(BOOKS_STATE))
//   );