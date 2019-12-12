import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { GetDataService } from '../../services/get-data.service';

@Component({
  selector: 'app-eng-hist',
  templateUrl: './eng-hist.component.html',
  styleUrls: ['./eng-hist.component.scss']
})
export class EngHistComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    title: {
      display: true,
      text: 'Average MCS Scores / Agent'
  },
    responsive: true,
    scales: {
      xAxes: [{
          gridLines: {
              offsetGridLines: true
          },
          scaleLabel: {
            display: true,
            labelString: "Agents"
          }
      }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "MCS Score"
          }
        }
      ]
  }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Average MCS' },
    { data: [], label: '# of Conv' },
  ];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'mcs'}
  ];
  public lineChartLabels: Label[] = [
    // 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  public lineChartOptions = {
    title: {
      display: true,
      text: 'Chronology of MCS Scores'
  },
    responsive: true,
    scales: {
      xAxes: [
        {
          responsive: true,
          type: "time",
          time: {
            unit: 'month',
            unitStepSize: 3,
            displayFormats: {
              quarter: "MMM DD"
            },
          },
          scaleLabel: {
            display: true,
            labelString: "Date"
          },
          distribution: "series",
          ticks: {
            autoSkip: true,
            maxTicksLimit: 12
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "MCS Score"
          }
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ]
    },
    {
      borderColor: "black",
      backgroundColor: "blue"
    }
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];

  constructor(
    private dataService: GetDataService
  ) {
    this.dataService.getEngHistoryData()
    .subscribe((response: any) => {
      console.log(response);
      let res = this.agentAverageScores(response);
      this.barChartData[0].data = res.mcsScores;
      this.barChartData[1].data = res.convos;
      this.barChartLabels = res.agents
      this.lineChartData = [
        {
          data: res.lineChartResults,
          label: "mcs"
        }
      ];
    },
    err => `Observer received an error`)
   }

  ngOnInit() {
  }

  public agentAverageScores(data) {
    let result = {};
    let lineChartResults = [];
    data.interactionHistoryRecords.forEach(set => {
      let date = new Date(set.info.startTime);
      lineChartResults.push({
        x: date,
        y: set.info.chatMCS
      });
      if(!result[set.info.agentFullName]) {
        result[set.info.agentFullName] = {
          chatMCS: set.info.chatMCS,
          count: 1
        }
      }
      else {
        let agent = result[set.info.agentFullName];
        agent.chatMCS += set.info.chatMCS;
        agent.count += 1;
      }
    })
    let allData = {
      mcsScores: [],
      agents: [],
      convos: [],
      lineChartResults
    }
    for(let key in result) {
      allData.mcsScores.push(result[key].chatMCS/result[key].count);
      allData.agents.push(key);
      allData.convos.push(result[key].count);
    }
    return allData;
  }

}
