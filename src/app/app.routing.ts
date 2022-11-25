import {Routes} from '@angular/router';
import {BookListComponent} from "./book-list/book-list.component";
import {BookDetailsComponent} from "./book-details/book-details.component";


export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BookListComponent,
    loadChildren: () => import('./book-list/book-list.module').then(m => m.BookListModule),
    data: {title: 'Book List'}

  },
  {
    path: 'books',
    component: BookListComponent,
    loadChildren: () => import('./book-list/book-list.module').then(m => m.BookListModule),
    data: {title: 'Book List'}

  },
  {
    path: 'books/:isbn',
    component: BookDetailsComponent,
    loadChildren: () => import('./book-details/book-details.module').then(m => m.BookDetailsModule),
    data: {title: 'Book Details'}
  }
];

