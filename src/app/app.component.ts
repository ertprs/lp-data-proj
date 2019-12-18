// import { WINDOW } from '@ng-toolkit/universal';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lp-data-proj';

  // constructor(@Inject(WINDOW) public window: Window,
  //   @Inject(PLATFORM_ID) private platformId: Object) {
  // }

  // onActivate(event) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.window.scroll(0, 0);  // window object used which is Instance of Window 
  //   }
  // }
}
