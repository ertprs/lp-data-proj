import { DOCUMENT } from "@angular/common";
import { PLATFORM_ID, Inject, Injectable } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { WindowRefService } from "./window-ref.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRefService: WindowRefService
  ) {}

  public isAuthenticated() {
    let bearer;
    if (isPlatformBrowser(this.platformId)) {
      console.log("checked whether it is authenticated");
      bearer = localStorage.getItem(
        "bearer"
      );
      console.log(bearer);
    }
    if (bearer) {
      return true;
    } else {
      return false;
    }
  }
}
