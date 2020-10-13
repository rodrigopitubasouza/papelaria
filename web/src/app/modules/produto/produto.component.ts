import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from './services/produto.service';
import { CategoriaService } from './services/categoria.service';
import { Produto } from './models/produto.model';
import { Categoria } from './models/categoria.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoadingService } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  get form() {
    return this.registerForm.controls;
  }

  get ValidationService() {
    return ValidationService;
  }

  public categorias = [];
  public title = 'Cadastrar Produto';
  public buttonSubmit = 'Enviar';
  public isEdit = false;
  public idProdutoEdicao: number;
  
  public registerForm: FormGroup;
  public submitted = false;

  constructor(public locale: LocaleService,
              private formBuilder: FormBuilder,    
              private activatedRoute: ActivatedRoute,
              private produtoService: ProdutoService,
              private categoriaService: CategoriaService,
              private loadingService: LoadingService,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.buildForm();
    this.populateEditingProduto();
    this.populateCategorias();
  }

  public addFieldException(error, form?): boolean {
    debugger
    let hasError = false;
    if (error.status === 400 && error.error.subErrors) {
        for (const validationError of error.error.subErrors) {
            const control = form ? form.get(validationError.field) : this.registerForm.get(validationError.field);
            if (control) {
                control.setErrors({ fieldError: validationError.message });
                hasError = true;
            }
        }
    }
    if (hasError) {
        return true;
    }
    return false;
  }

  public clearForm(): void {
    this.registerForm.reset();
    this.registerForm.markAsUntouched();
    this.registerForm.markAsPristine();
    this.submitted = false;
  }

  onSubmit() {
    this.loadingService.showLoading();
    const produto = this.registerForm.value;
    if(this.registerForm.invalid) {
      this.loadingService.hideLoading();
      return;
    }
    if(!this.isEdit) {
      this.salvarProduto(produto);
    }
    else {
      this.atualizarProduto(produto);
    }
  }

  public validationNumber(event) {
    const regex = /^(0|[1-9][0-9]*)$/
    if(!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(150)]],
      codigoBarras: [null, [Validators.required, Validators.maxLength(25)]],
      descricao: [null, [Validators.required, Validators.maxLength(350)]],
      quantidade: [null, [Validators.required, Validators.min(1), Validators.max(2147483647)]],
      categoria: [null, Validators.required],
    });
  }

  private populateEditingProduto(): void {
    this.idProdutoEdicao = this.activatedRoute.snapshot.params.id;
    if(this.idProdutoEdicao) {
      this.isEdit = true;
      this.title = 'Editar Produto';
      this.buttonSubmit = 'Atualizar';
      this.produtoService.findById(this.idProdutoEdicao).subscribe((produto: Produto) => {
        this.registerForm.patchValue(produto);
      });
    }
  }

  private atualizarProduto(produto) {
    this.produtoService.atualizar(produto, this.idProdutoEdicao).subscribe(sucessHandler => {
      this.clearForm();
      this.router.navigate(["/gerenciar/estoque"]);
    }, error => {
      this.addFieldException(error);
    });
  }

  private salvarProduto(produto) {
    this.produtoService.salvar(produto).subscribe(sucessHandler => {
      this.clearForm();
    }, error => {
      this.addFieldException(error);
    });
  }

  private populateCategorias(): void {
      this.categoriaService.findAll().subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }
}
