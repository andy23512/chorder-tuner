import { Route } from '@angular/router';
import { MainPage } from '../page/main-page';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: MainPage },
];
