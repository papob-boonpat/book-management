import { Injectable } from '@angular/core';
import * as bookActions from './book.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from './book.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private bookService: BookService) {}

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.AddBook),
      mergeMap((action) =>
        this.bookService.addBook(action).pipe(
          map((book) => bookActions.AddBookSuccess(book)),
          catchError((error) => of(bookActions.AddBookFailure({ error })))
        )
      )
    )
  );
}
