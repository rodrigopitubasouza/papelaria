import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoadingComponent } from './components/loading/loading.component';
import { GatewayComponent } from './components/gateway/gateway.component';

@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    NavbarComponent,
    NotFoundComponent,
    LoadingComponent,
    GatewayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCardModule
  ],
  exports: [
    LoadingComponent,
    FooterComponent,
    MenuComponent,
    NavbarComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
