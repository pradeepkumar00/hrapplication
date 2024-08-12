import { Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./core/guards/auth.guard";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: "index.html",
    redirectTo: ""
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    loadChildren: () => import("./components/main/main.module").then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },
];

export const AppRoutes = RouterModule.forRoot(routes);
