import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FilmeService } from '../../services/filme.service';
import { JogoService } from '../../services/jogo.service';
import { tratarErroApi } from '../../shared/utils/erro-api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly filmes = inject(FilmeService);
  private readonly jogos = inject(JogoService);

  totalFilmes = signal<number | null>(null);
  totalJogos = signal<number | null>(null);
  erro = signal<string | null>(null);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.erro.set(null);
    forkJoin({ f: this.filmes.listar(), j: this.jogos.listar() }).subscribe({
      next: ({ f, j }) => {
        this.totalFilmes.set(f.length);
        this.totalJogos.set(j.length);
      },
      error: (e) => this.erro.set(tratarErroApi(e).mensagem),
    });
  }
}
