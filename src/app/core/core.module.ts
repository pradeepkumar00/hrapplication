import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AuthGuard } from "./guards/auth.guard";

import * as fromServices from "./services";
import { PadPipe } from "./pipes/pad.pipe";

const pipes = [PadPipe];
const guards = [AuthGuard];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [...fromServices.services, ...guards],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only"
      );
    }
  }
}
