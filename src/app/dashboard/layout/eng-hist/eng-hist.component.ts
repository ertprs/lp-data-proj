import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { GetDataService } from '../../services/get-data.service';

@Component({
  selector: 'app-eng-hist',
  templateUrl: './eng-hist.component.html',
  styleUrls: ['./eng-hist.component.scss']
})
export class EngHistComponent implements OnInit {
  data;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  
  constructor(
    private dataService: GetDataService
  ) {
    this.dataService.getEngHistoryData()
    .subscribe((data: any) => {
      console.log(data);
      this.data = data;
    },
    err => `Observer received an error`)
   }

  ngOnInit() {
  }

}
