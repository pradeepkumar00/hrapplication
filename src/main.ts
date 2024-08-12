import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { ProdScripts, DevScripts } from "./assets/GA/script";

if (environment.production) {
  enableProdMode();
  for (let script of ProdScripts) {
    let node = document.createElement("script"); // creates the script tag
    node.innerHTML = script; // sets the source (insert url in between quotes)
    node.type = "text/javascript"; // set the script type
    node.async = true; // makes script run asynchronously
    node.charset = "utf-8";
    // append to head of document
    document.getElementsByTagName("head")[0].appendChild(node);
  }
} else {
  for (let script of DevScripts) {
    let node = document.createElement("script"); // creates the script tag
    node.innerHTML = script; // sets the source (insert url in between quotes)
    node.type = "text/javascript"; // set the script type
    node.async = true; // makes script run asynchronously
    node.charset = "utf-8";
    // append to head of document
    document.getElementsByTagName("head")[0].appendChild(node);
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
