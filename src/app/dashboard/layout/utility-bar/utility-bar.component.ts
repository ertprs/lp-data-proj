import { Component, PLATFORM_ID, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";
import { WindowRefService } from "src/app/services/window-ref.service";

@Component({
  selector: "app-utility-bar",
  templateUrl: "./utility-bar.component.html",
  styleUrls: ["./utility-bar.component.scss", "../layout.component.scss"]
})
export class UtilityBarComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRefService: WindowRefService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowRefService.nativeWindow.sessionStorage.setItem("bearer", "");
      this.windowRefService.nativeWindow.sessionStorage.setItem(
        "accountId",
        ""
      );
      this.router.navigate(["/home"]);
    }
  }
}
