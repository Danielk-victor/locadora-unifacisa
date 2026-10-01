import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmarDialogoComponent } from '../../../shared/confirmar-dialogo/confirmar-dialogo.component';
import { Filme } from '../../../models/filme.model';
import { FilmeService } from '../../../services/filme.service';
import { tratarErroApi } from '../../../shared/utils/erro-api';

@Component({
  selector: 'app-filme-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ConfirmarDialogoComponent],
  templateUrl: './filme-list.component.html',
})
export class FilmeListComponent implements OnInit {
  private readonly service = inject(FilmeService);

  itens = signal<Filme[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);
  busca = signal('');
  paraExcluir = signal<Filme | null>(null);
  excluindo = signal(false);

  filtrados = computed(() => {
    const termo = this.busca().trim().toLowerCase();
    if (!termo) return this.itens();
    return this.itens().filter((i) =>
      [i.titulo, i.genero, i.diretor].some((v) => v.toLowerCase().includes(termo)),
    );
  });

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set(null);
    this.service.listar().subscribe({
      next: (dados) => {
        this.itens.set(dados);
        this.carregando.set(false);
      },
      error: (e) => {
        this.erro.set(tratarErroApi(e).mensagem);
        this.carregando.set(false);
      },
    });
  }

  pedirExclusao(item: Filme): void {
    this.paraExcluir.set(item);
  }

  cancelarExclusao(): void {
    if (!this.excluindo()) this.paraExcluir.set(null);
  }

  confirmarExclusao(): void {
    const item = this.paraExcluir();
    if (!item?.id) return;
    this.excluindo.set(true);
    this.service.excluir(item.id).subscribe({
      next: () => {
        this.itens.update((lista) => lista.filter((i) => i.id !== item.id));
        this.excluindo.set(false);
        this.paraExcluir.set(null);
      },
      error: (e) => {
        this.erro.set(tratarErroApi(e).mensagem);
        this.excluindo.set(false);
        this.paraExcluir.set(null);
      },
    });
  }
}
