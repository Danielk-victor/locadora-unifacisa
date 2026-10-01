import { Injectable } from '@angular/core';
import { Filme } from '../models/filme.model';
import { API_URL } from './api.config';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class FilmeService extends CrudService<Filme> {
  constructor() {
    super(`${API_URL}/filmes`);
  }
}
