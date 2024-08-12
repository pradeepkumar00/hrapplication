import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  private specialCharacters = /([`~!@#$%^&*()_+=\[\]{}\\|'";:\/?.>,<])/g;
  params = {};

  getParameterByName(name, url?) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return "";
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  sanitize(input: string) {
    return input.replace(this.specialCharacters, "");
  }

  parseJWT(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  clone(val) {
    return JSON.parse(JSON.stringify(val));
  }

  setParams(url?) {
    if (!url) {
      url = window.location.href;
    }

    window.location.search
      .slice(1)
      .split("&")
      .forEach((query) => {
        const queryKey = query.split("=")[0];
        if (queryKey && queryKey !== "jwt") {
          this.params[queryKey] = this.getParameterByName(queryKey);
        }
      });
  }

  getParams() {
    return this.params;
  }
}
