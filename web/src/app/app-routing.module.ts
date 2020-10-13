import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GatewayComponent } from './shared/components/gateway/gateway.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ProdutoComponent } from './modules/produto/produto.component';
import { GerenciarEstoqueComponent } from './modules/gerenciar-estoque/gerenciar-estoque.component';


const routes: Routes = [
  {
    path: '', component: GatewayComponent
  },
  {
    path: '',
    children: [
      {
        path: 'gerenciar',
        loadChildren: './modules/produto/produto.module#ProdutoModule'
      },
      {
        path: 'gerenciar/estoque', component: GerenciarEstoqueComponent,
        loadChildren: './modules/gerenciar-estoque/gerenciar-estoque.module#GerenciarEstoqueModule'
      },
    ]
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
