import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { AnalyticsService, AppService } from "src/app/core/services";

@Component({
  selector: "app-tnc-detail",
  templateUrl: "./tnc-detail.component.html",
  styleUrls: ["./tnc-detail.component.scss"],
})
export class TncDetailComponent implements OnInit, AfterViewInit {
  @Output() onClose = new EventEmitter();
  @ViewChild('iFrameContainer', { static: true }) iFrameContainer: ElementRef;
  iframe: HTMLIFrameElement;
  // loading = true;

  // urlSafe: SafeResourceUrl;
  // url="";

  tncUrl;
  constructor(
    public sanitizer: DomSanitizer,
    private analyticsService: AnalyticsService,
    private appService: AppService
  ) {
    // this.urlSafe=sanitizer.bypassSecurityTrustResourceUrl(this.url)
  }

  ngOnInit(): void {
    this.analyticsService.fireGA("pageload", "tnc_page");
    this.analyticsService.log('tnc_page', 'pageload');
    this.tncUrl = this.appService.getConfigParam("TNC_URL");
  }

  ngAfterViewInit() {
    this.iframe = document.createElement("iframe");
    this.iframe.style.minHeight = "100%";
    this.iframe.style.minWidth = "100%";
    this.iframe.style.border = "none";
    this.iframe.style.width = "100%";
    this.iframe.style.height = "100%";
    // this.iframe.style.borderRadius = "24px 24px 0px 0px"
    this.iframe.setAttribute("scrolling", "true");
    // this.iframe.addEventListener("load", (e) => {
    //   this.loading = false;
    // });
    this.iframe.src = this.tncUrl;
    this.iFrameContainer.nativeElement.appendChild(
    this.iframe
    );
  }
  close() {
    this.onClose.emit();
  }
}
