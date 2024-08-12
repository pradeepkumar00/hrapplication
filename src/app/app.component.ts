import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService, UtilService } from "./core/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.authService.setAppQuery({
      jwt: this.utilService.getParameterByName("jwt"),
    });
  }

  ngOnDestroy(): void {
  }
}
