import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GetDataService } from '../../services/get-data.service';

@Component({
  selector: 'app-msg-int-hist',
  templateUrl: './msg-int-hist.component.html',
  styleUrls: ['./msg-int-hist.component.scss']
})
export class MsgIntHistComponent implements OnInit {
  data;
  
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(
    private dataService: GetDataService
  ) { 
    this.dataService.getMsgIntHistoryData()
    .subscribe((data: any) => {
      console.log(data);
      this.data = data;
    },
    err => `Observer received an error`)
  }

  ngOnInit() {
  }

}
