import { UtilService } from "./util.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { ProfileService } from "./profile.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token;
  private isAuthenticated = false;
  private appQuery: any = {};
  private authInfo = null;
  utmParam;

  constructor(
    private util: UtilService,
    private http: HttpClient,
    private profileService: ProfileService,
    private router: Router
  ) {}

  setAuthInfo(info) {
    this.authInfo = info;
  }

  getAuthInfo() {
    return this.authInfo;
  }

  setAppQuery(query) {
    this.appQuery = query;
  }
  getAppQuery(){
    return this.appQuery
  }

  setIsAuthenticated(bool) {
    this.isAuthenticated = bool;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  setAuthToken(token) {
    localStorage.setItem("authToken", token)
    this.token = token;
  }

  getAuthToken() {
    return this.token;
  }
  setUtmData(param) {
    this.utmParam = param;
  }

  getUtmData() {
    return this.utmParam;
  }
  login(token) {
    this.token = token;
    if (this.token) {
      return this.http
        .post(`${environment.API_HOST}/login`, {
          // ...this.util.getParams(),
          // // device: "smartphone",
        })
        .pipe(
          tap((res: any) => {
            console.log(res)
            this.profileService.setProfile(res)
            if(res.is_superuser){
              this.router.navigate(['/'])
            }
            else{
              this.router.navigate(['/client'])
            }
            // this.setAuthToken(authInfo.jwt);
            // this.setAuthInfo(authInfo);
            this.setIsAuthenticated(true);
          })
        );
    } else {
      return throwError(new Error("NO_JWT"));
    }
  }

  logout() {
    this.setAuthInfo(null);
    this.setIsAuthenticated(false);
  }
}
