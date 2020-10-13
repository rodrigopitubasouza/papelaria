import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Produto } from '../produto/models/produto.model';
import { ProdutoService } from '../produto/services/produto.service';

@Component({
  selector: 'app-gerenciar-estoque',
  templateUrl: './gerenciar-estoque.component.html',
  styleUrls: ['./gerenciar-estoque.component.scss']
})
export class GerenciarEstoqueComponent implements OnInit {

  displayedColumns = ['nome', 'codigoBarras', 'quantidade', 'nomeCategoria', 'actions'];
  dataSource: MatTableDataSource<Produto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private produtoService: ProdutoService,
    private router: Router) {}
  ngOnInit(): void {
    this.produtoService.findAll().subscribe( listaProdutos => {
      this.dataSource = new MatTableDataSource(listaProdutos);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(id) {
    this.router.navigate(['gerenciar/produto/', id]);
  }

  deletar(id, index) {
    this.produtoService.deletar(id).subscribe( success => {
        this.dataSource.data.splice(index, 1)
        this.dataSource.data = [...this.dataSource.data];
    });
  }
}
