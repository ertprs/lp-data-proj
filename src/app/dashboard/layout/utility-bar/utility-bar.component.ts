import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-utility-bar",
  templateUrl: "./utility-bar.component.html",
  styleUrls: ["./utility-bar.component.scss", "../layout.component.scss"]
})
export class UtilityBarComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {}

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("bearer", "");
      localStorage.setItem("accountId", "");
      this.router.navigate(["/home"]);
    }
  }
}
