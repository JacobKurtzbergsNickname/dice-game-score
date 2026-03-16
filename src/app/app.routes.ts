import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing-page/landing-page.component').then((m) => m.LandingPageComponent),
  },
  {
    path: 'game',
    loadComponent: () => import('./score-board/score-board.component').then((m) => m.ScoreBoardComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
