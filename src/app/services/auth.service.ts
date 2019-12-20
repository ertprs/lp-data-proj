import { Inject, PLATFORM_ID, Injectable } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public isAuthenticated() {
    if (isPlatformBrowser(this.platformId)) {
      let bearer = localStorage.getItem("bearer");
      if (bearer) {
        return true;
      } else {
        return false;
      }
    }
  }
}
