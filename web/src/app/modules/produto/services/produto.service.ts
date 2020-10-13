import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/shared/core/app-constants';
import { HttpCore } from 'src/app/shared/core/http-core';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends HttpCore{

  constructor(http: HttpClient) {
    super(http, AppConstants.PRODUTO_CONTROLLER);
   }

   public salvar(dto: Produto) {
        return this.post<Produto, void>(null, dto);
   }

   public atualizar(dto: Produto, id: number) {
    return this.put<Produto, void>(null, dto, id);
  }

  public deletar(id: string) {
    return this.delete<Produto>(null, id);
  }

   public findById(id: number) {
       return this.get<Produto>(null, id);
   }

   public findAll() {
     return this.get<any>(null);
   }
}
