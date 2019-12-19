import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  @Input()
  apiType: string;
  navLinks: any[] = [
    {
      label: " Engagement History",
      link: "/dashboard/engagement-history",
      index: 0,
      icon: "bar_chart"
    },
    {
      label: " Messaging Interactions History",
      link: "/dashboard/msg-interactions",
      index: 1,
      icon: "pie_chart"
    }
  ];
  activeLinkIndex = -1;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.apiType = this.route.snapshot.params["apiType"];
    this.router.events.subscribe(res => {
      let t = this.navLinks.find(tab => {
        if (tab.link === this.router.url) {
          this.apiType = this.router.url.slice(11);
          return tab;
        }
      });
      if(t) { this.activeLinkIndex = t.index }
    });
  }
}
