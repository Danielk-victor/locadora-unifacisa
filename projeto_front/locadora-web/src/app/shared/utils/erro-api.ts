import { HttpErrorResponse } from '@angular/common/http';

export interface ErroApi {
  mensagem: string;
  /** Erros por campo vindos da validação do Spring (status 400). */
  campos: Record<string, string>;
}

/** Converte qualquer erro HTTP em mensagem amigável + erros por campo. */
export function tratarErroApi(err: unknown): ErroApi {
  if (!(err instanceof HttpErrorResponse)) {
    return { mensagem: 'Ocorreu um erro inesperado.', campos: {} };
  }
  if (err.status === 0) {
    return {
      mensagem:
        'Não foi possível conectar à API. Verifique se o back-end (Spring Boot) está rodando em http://localhost:8080.',
      campos: {},
    };
  }
  if (err.status === 400 && err.error?.campos) {
    return { mensagem: 'Corrija os campos destacados.', campos: err.error.campos };
  }
  if (err.status === 404) {
    return { mensagem: err.error?.mensagem ?? 'Registro não encontrado.', campos: {} };
  }
  return { mensagem: err.error?.mensagem ?? `Erro ${err.status} ao falar com a API.`, campos: {} };
}
