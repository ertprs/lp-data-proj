import { Inject, PLATFORM_ID, Injectable } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public isAuthenticated() {
    console.log("checked whether it is authenticated");
    if (isPlatformBrowser(this.platformId)) {
      let bearer = localStorage.getItem("bearer");
      console.log(bearer);
      if (bearer) {
        return true;
      } else {
        return false;
      }
    }
  }
}
