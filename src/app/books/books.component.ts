import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../../store/books.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [JsonPipe],
    // 👇 Providing `BooksStore` at the component level.
    providers: [BooksStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {

  readonly store = inject(BooksStore);
}
