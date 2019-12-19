import { Component, OnInit, Inject, PLATFORM_ID, Input, ChangeDetectorRef } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input()
  loggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetector: ChangeDetectorRef
  ) {
    this.changeDetector.detach();
    setInterval(() => {
      this.changeDetector.detectChanges();
    }, 5000);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      let bearer = localStorage.getItem("bearer");
      if (bearer) {
        this.loggedIn = true;
      }
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("bearer", "");
      localStorage.setItem("accountId", "");
      this.loggedIn = false;
      this.router.navigate(["/home"]);
    }
  }
}
