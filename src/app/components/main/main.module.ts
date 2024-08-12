import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';  

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { SharedModule } from "src/app/shared/shared.module";
import { HireFormComponent } from './hire-form/hire-form.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [MainComponent, HireFormComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule, ReactiveFormsModule,],
})
export class MainModule {}
