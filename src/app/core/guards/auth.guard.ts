import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

import { AppService } from "../services/app.service";
import { AuthService } from "../services/auth.service";
import {
  ProfileService,
  RestService,
  ThemeService,
  UtilService,
} from "../services";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { forkJoin, of, Subscriber } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  digitalData;
  constructor(
    private authService: AuthService,
    private router: Router,
    private appService: AppService,
    private profileService: ProfileService,
    private themeService: ThemeService,
    private utilService: UtilService,
  ) {
    this.authService.setUtmData(this.digitalData);
    this.appService.setPlatform(
      this.utilService.getParameterByName("platform") || "myjio"
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.getIsAuthenticated()) {
      return true;
    }
    else if(localStorage.getItem('authToken') || this.authService.getAppQuery().jwt){
      let token=this.authService.getAppQuery().jwt
      token=token==null ? localStorage.getItem('authToken') : token
      console.log(token)
      return this.authService.login(token).pipe(
        switchMap(() =>
          forkJoin([
            of(true)
          ])
        ),
        switchMap(() => {
          this.authService.setIsAuthenticated(true)
          // this.router.navigate(["/"]);
          return of(true);
        }),
        catchError((e) => {
          this.router.navigate(['login'])
          return of(false);
        })
      );
    }
    else{
      this.router.navigate(['login'])
    }
  }
}
