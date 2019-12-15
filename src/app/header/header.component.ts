import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  loggedIn: boolean = false;

  constructor( 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if(sessionStorage.bearer) {
      this.loggedIn = true;
    }
  }

  logout(){
    sessionStorage.setItem('bearer', '');
    sessionStorage.setItem('accountId', '');
    this.loggedIn = false;
    this.router.navigate(['/home'])
  }
}
