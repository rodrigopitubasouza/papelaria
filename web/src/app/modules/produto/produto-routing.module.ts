import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoComponent } from './produto.component';

const routes: Routes = [
  {
    path: 'produto', component: ProdutoComponent
  },
  {
    path: 'produto/:id', component: ProdutoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRouting { }
