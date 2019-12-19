import {
  Component,
  OnInit,
  Input,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input()
  loggedIn: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      let bearer = localStorage.getItem(
        "bearer"
      );
      if (bearer) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("bearer", "");
      localStorage.setItem(
        "accountId",
        ""
      );
      this.loggedIn = false;
      this.router.navigate(["/home"]);
    }
  }
}
