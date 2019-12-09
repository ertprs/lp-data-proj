import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private dataService: GetDataService
  ) { }

  ngOnInit() {
    this.dataService.getEngHistoryData()
    .subscribe((data: any) => {
      console.log(data);
      return data;
    },
    err => `Observer received an error`)

  }

}
