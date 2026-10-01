import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Início | Locadora Unifacisa',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'filmes',
    title: 'Filmes | Locadora Unifacisa',
    loadComponent: () =>
      import('./pages/filmes/filme-list/filme-list.component').then((m) => m.FilmeListComponent),
  },
  {
    path: 'filmes/novo',
    title: 'Novo filme | Locadora Unifacisa',
    loadComponent: () =>
      import('./pages/filmes/filme-form/filme-form.component').then((m) => m.FilmeFormComponent),
  },
  {
    path: 'filmes/:id/editar',
    title: 'Editar filme | Locadora Unifacisa',
    loadComponent: () =>
      import('./pages/filmes/filme-form/filme-form.component').then((m) => m.FilmeFormComponent),
  },
  {
    path: 'jogos',
    title: 'Jogos | Locadora Unifacisa',
    loadComponent: () =>
      import('./pages/jogos/jogo-list/jogo-list.component').then((m) => m.JogoListComponent),
  },
  {
    path: 'jogos/novo',
    title: 'Novo jogo | Locadora Unifacisa',
    loadComponent: () =>
      import('./pages/jogos/jogo-form/jogo-form.component').then((m) => m.JogoFormComponent),
  },
  {
    path: 'jogos/:id/editar',
    title: 'Editar jogo | Locadora Unifacisa',
    loadComponent: () =>
      import('./pages/jogos/jogo-form/jogo-form.component').then((m) => m.JogoFormComponent),
  },
  {
    path: '**',
    title: 'Não encontrada | Locadora Unifacisa',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
