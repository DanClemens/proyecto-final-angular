import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteMainComponent } from './cliente-main/cliente-main.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { FormsModule } from '@angular/forms';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ClienteMainComponent,
    ClienteFormComponent,
    ClienteDetailComponent
  ],
  exports: [
    ClienteMainComponent,
    ClienteFormComponent,
    ClienteDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ClienteModule { }
