import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDirective } from './drag.directive';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientComponent, DragDirective],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ClientModule { }
