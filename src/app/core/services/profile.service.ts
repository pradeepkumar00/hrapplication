import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  profile;
  locationData;
  campaignState;

  constructor(private httpClient: HttpClient) {}

  getProfile() {
    return this.profile
  }


  setProfile(payload) {
    this.profile=payload
  }
}
