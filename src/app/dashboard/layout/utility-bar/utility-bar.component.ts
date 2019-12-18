import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-utility-bar",
  templateUrl: "./utility-bar.component.html",
  styleUrls: ["./utility-bar.component.scss", "../layout.component.scss"]
})
export class UtilityBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  logout() {
    sessionStorage.setItem("bearer", "");
    sessionStorage.setItem("accountId", "");
    this.router.navigate(["/home"]);
  }
}
