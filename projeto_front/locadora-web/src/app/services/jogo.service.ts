import { Injectable } from '@angular/core';
import { Jogo } from '../models/jogo.model';
import { API_URL } from './api.config';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class JogoService extends CrudService<Jogo> {
  constructor() {
    super(`${API_URL}/jogos`);
  }
}
