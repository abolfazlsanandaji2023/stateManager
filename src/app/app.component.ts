import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BooksStore } from '../store/books.store';

@Component({
  selector: 'app-root',
  imports: [BooksComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'stateManager';
}
