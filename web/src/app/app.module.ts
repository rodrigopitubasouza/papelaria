import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ToastrModule } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { AppComponent } from './app.component';
import { GerenciarEstoqueModule } from './modules/gerenciar-estoque/gerenciar-estoque.module';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { HttpInterceptor } from './shared/interceptors/http.interceptor';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    GerenciarEstoqueModule,
    ProdutoModule,
    MatSidenavModule,
    MatSnackBarModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right"
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
