import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input()
  apiType: string;

  constructor (
    private route: ActivatedRoute
  ) {
    // this.route.params
    //   .pipe(
    //     switchMap((params: Params) => { 
    //       return params["apiType"]; 
    //     })
    //   )
    //   .subscribe(
    //     api => {
    //       console.log(api)
    //       this.apiType;
    //     },
    //     err => console.log(err)
    //   );
  }

  ngOnInit() {
    this.apiType = this.route.snapshot.params['apiType'];
  }

}
