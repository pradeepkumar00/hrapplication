import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ClientLogsService {
  constructor(private httpClient: HttpClient) {}

  log(flag, serverqId, parameters?) {
    var payload = null;
    if (parameters) {
      payload = {
        flag: flag,
        sqId: serverqId,
        parameters: parameters,
      };
    } else {
      payload = {
        flag: flag,
        sqId: serverqId,
      };
    }

    this.httpClient
      .post(`${environment.API_HOST}/log`, payload)
      .subscribe((res) => {});
  }
}
