import {
  Component,
  OnInit,
  Input,
  PLATFORM_ID,
  Inject,
  ChangeDetectorRef
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";
import { WindowRefService } from "../services/window-ref.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input()
  loggedIn: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRefService: WindowRefService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {
    changeDetector.detach();
    setInterval(() => {
      this.changeDetector.detectChanges();
    }, 1000);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      let bearer = this.windowRefService.nativeWindow.sessionStorage.getItem(
        "bearer"
      );
      if (bearer) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
  }

  //   ngAfterViewChecked() {
  //     let bearer = sessionStorage.getItem("bearer")
  //     if (bearer) {
  //       this.loggedIn = true;
  //     } else {
  //       this.loggedIn = false;
  //     }
  // }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowRefService.nativeWindow.sessionStorage.setItem("bearer", "");
      this.windowRefService.nativeWindow.sessionStorage.setItem(
        "accountId",
        ""
      );
      this.loggedIn = false;
      this.router.navigate(["/home"]);
    }
  }
}
