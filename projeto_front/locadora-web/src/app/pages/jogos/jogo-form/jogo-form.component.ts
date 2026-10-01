import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Jogo } from '../../../models/jogo.model';
import { JogoService } from '../../../services/jogo.service';
import { tratarErroApi } from '../../../shared/utils/erro-api';
import { mensagemCampo } from '../../../shared/utils/form-utils';

@Component({
  selector: 'app-jogo-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './jogo-form.component.html',
})
export class JogoFormComponent implements OnInit {
  private readonly service = inject(JogoService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  id: number | null = null;
  carregando = signal(false);
  salvando = signal(false);
  erro = signal<string | null>(null);
  errosServidor = signal<Record<string, string>>({});

  form = new FormGroup({
    titulo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    genero: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    plataforma: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    anoLancamento: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1888),
      Validators.max(2100),
    ]),
    valorLocacao: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
    disponivel: new FormControl(true, { nonNullable: true }),
  });

  get editando(): boolean {
    return this.id !== null;
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (!param) return;
    this.id = Number(param);
    this.carregando.set(true);
    this.service.buscarPorId(this.id).subscribe({
      next: (item) => {
        this.form.patchValue(item);
        this.carregando.set(false);
      },
      error: (e) => {
        this.erro.set(tratarErroApi(e).mensagem);
        this.carregando.set(false);
      },
    });
  }

  erroDo(campo: string): string | null {
    return mensagemCampo(this.form.get(campo), this.errosServidor()[campo]);
  }

  limparErroServidor(campo: string): void {
    if (!this.errosServidor()[campo]) return;
    this.errosServidor.update(({ [campo]: _, ...resto }) => resto);
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvando.set(true);
    this.erro.set(null);
    this.errosServidor.set({});

    const dados = this.form.getRawValue() as Jogo;
    const requisicao = this.id !== null ? this.service.atualizar(this.id, dados) : this.service.criar(dados);

    requisicao.subscribe({
      next: () => this.router.navigate(['/jogos']),
      error: (e) => {
        const r = tratarErroApi(e);
        this.erro.set(r.mensagem);
        this.errosServidor.set(r.campos);
        this.salvando.set(false);
      },
    });
  }
}
