import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/shared/core/app-constants';
import { HttpCore } from 'src/app/shared/core/http-core';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends HttpCore{

  constructor(http: HttpClient) {
    super(http, AppConstants.CATEGORIA_CONTROLLER);
   }

   public findAll() {
     return this.get<any>(null);
   }
}
