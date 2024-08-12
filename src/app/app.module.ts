import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { CoreModule } from "./core/core.module";


import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor, ErrorInterceptor } from "./core/interceptors";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';

const components = [AppComponent, LoginComponent];

 
@NgModule({
  declarations: [...components],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutes,
    SharedModule, 
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ // ToastrModule added
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
