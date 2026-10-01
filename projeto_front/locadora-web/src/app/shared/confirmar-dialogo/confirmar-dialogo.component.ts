import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirmar-dialogo',
  standalone: true,
  templateUrl: './confirmar-dialogo.component.html',
})
export class ConfirmarDialogoComponent {
  titulo = input('Confirmar exclusão');
  mensagem = input.required<string>();
  processando = input(false);
  confirmar = output<void>();
  cancelar = output<void>();
}
