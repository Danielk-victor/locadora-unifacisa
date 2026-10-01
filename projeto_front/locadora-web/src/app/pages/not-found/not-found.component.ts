import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="estado">
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <a routerLink="/" class="btn btn-primario">Voltar ao início</a>
    </div>
  `,
})
export class NotFoundComponent {}
