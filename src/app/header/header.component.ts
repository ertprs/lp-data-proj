import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  isHome: boolean = false;

  constructor( 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route.data);
  }

}
