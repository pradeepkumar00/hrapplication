import { Injectable } from "@angular/core";
import { retry } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class AppService {
  private config: any = {};

  gameAudiomuted=false
  private userInfo: any = {};
  coords = {
    lat: null,
    long: null,
  };
  platform = "myjio";
  timeOffset = 0;
  userProfile = {};
  adsParams: any;
  allowUser = true;
  gameId: string = '';

  getGameId(){
    return this.gameId;
  }

  setGameId(id){
    this.gameId = id;
  } 
  
  setUserInfo(info) {
    this.userInfo = info;
    localStorage["userInfo"] = JSON.stringify(info);
  }

  getUserInfo() {
    const userInfo = localStorage["userInfo"];
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return this.userInfo;
  }

  setLocationCoords(lat, long) {
    this.coords.lat = lat;
    this.coords.long = long;
  }

  getLocationCoords() {
    return this.coords;
  }

  getConfigParam(param) {
    return environment[param];
  }

  setUserProfile(profile) {
    Object.assign(this.userProfile, profile);
  }

  setPlatform(platform) {
    this.platform = platform;
  }

  getPlatform() {
    return this.platform;
  }

  getOS() {
    if (navigator.userAgent.match(/Android/i)) {
      return "android";
    }
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      return "ios";
    }
    return "others";
  }

  getUserProfile() {
    return this.userProfile;
  }

  setCurrentTimeOffset(offset) {
    this.timeOffset = offset;
  }

  getCurrentTimeOffset() {
    return this.timeOffset;
  }

  setAdsParams(params) {
    this.adsParams = params;
  }

  getAdsParams() {
    return this.adsParams;
  }

  setAllowUser(allowUser) {
    this.allowUser = allowUser;
  }

  getAllowUser() {
    return this.allowUser;
  }

  logout() {
    this.setUserInfo({});
  }
}
