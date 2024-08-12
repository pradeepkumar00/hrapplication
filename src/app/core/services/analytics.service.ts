import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";
import { AppService } from "./app.service";
import { HttpClient } from "@angular/common/http";

declare const dataLayer: any;
@Injectable({
  providedIn: "root",
})
export class AnalyticsService {
  
  constructor(private appService: AppService, private router: Router, private httpClient: HttpClient) {}

  fireGA(event, page_title, payload?) {
    let linkData: any = {};
    try {
      linkData = {
        event,
        page_title,
        app_name: "run_o_meter",
        env: environment.ENV,
        platform: this.appService.getPlatform(),
        ...payload,
      };
      dataLayer.push(linkData);
    } catch (e) {}
  }

  log(page_title, event, param?) {
    var payload = {};
    payload = {
      page_title,
      event,
      ...param,
    };
    this.httpClient.post(`${environment.API_HOST}/log`, payload).subscribe((res) => {});
  }
}
