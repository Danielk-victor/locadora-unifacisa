import { AbstractControl } from '@angular/forms';

/** Mensagem de erro de um campo (validação local ou devolvida pela API). */
export function mensagemCampo(
  control: AbstractControl | null,
  erroServidor?: string,
): string | null {
  if (erroServidor) return erroServidor;
  if (!control || !control.invalid || !(control.touched || control.dirty)) return null;
  if (control.hasError('required')) return 'Campo obrigatório.';
  if (control.hasError('min')) return `Valor mínimo: ${control.getError('min').min}.`;
  if (control.hasError('max')) return `Valor máximo: ${control.getError('max').max}.`;
  return 'Valor inválido.';
}
