import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label, Color } from "ng2-charts";
import { GetDataService } from "../../services/get-data.service";
import { Subscription } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";

let params = {
  offset: 0,
  limit: 50,
  sort: "start:desc"
};

let payload = {
  interactive: true,
  ended: true,
  start: {
    from: Date.now() - 60000 * 60 * 24 * 30,
    to: Date.now()
  }
};
@Component({
  selector: "app-eng-hist",
  templateUrl: "./eng-hist.component.html",
  styleUrls: ["./eng-hist.component.scss", "../layout.component.scss"]
})
export class EngHistComponent implements OnInit {
  data;
  subscription: Subscription;

  public barChartOptions: ChartOptions = {
    title: {
      display: true,
      text: "Average MCS Scores / Agent"
    },
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            offsetGridLines: true
          },
          scaleLabel: {
            display: true,
            labelString: "Agents"
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
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: "Average MCS" },
    { data: [], label: "# of Conv" }
  ];

  public lineChartData: ChartDataSets[] = [{ data: [], label: "mcs" }];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    title: {
      display: true,
      text: "Chronology of MCS Scores"
    },
    responsive: true,
    scales: {
      xAxes: [
        {
          responsive: true,
          type: "time",
          time: {
            unit: "date",
            unitStepSize: 5,
            displayFormats: {
              day: "MMM D"
            }
          },
          scaleLabel: {
            display: true,
            labelString: "Date"
          },
          distribution: "series",
          ticks: {
            autoSkip: true,
            maxTicksLimit: 12,
            source: "auto"
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
    private dataService: GetDataService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {
    this.dataService.getEngHistoryData({ params, payload }).subscribe(
      (response: any) => {
        let res = this.agentAverageScores(response);
        this.data = response;
        this.barChartData[0].data = res.mcsScores;
        this.barChartData[1].data = res.convos;
        this.barChartLabels = res.agents;
        this.lineChartData = [
          {
            data: res.lineChartResults,
            label: "mcs"
          }
        ];
      },
      err => `Observer received an error`
    );
  }

  ngOnInit() {
    this.dataService.currentEngHist.subscribe(data => {
      if (data.interactionHistoryRecords) {
        this.data = data;
        let res = this.agentAverageScores(data);
        this.barChartData[0].data = res.mcsScores;
        this.barChartData[1].data = res.convos;
        this.barChartLabels = res.agents;
        this.lineChartData = [
          {
            data: res.lineChartResults,
            label: "mcs"
          }
        ];
      } 
    });
  }

  public agentAverageScores(data) {
    let result = {};
    let lineChartResults = [];
    data.interactionHistoryRecords.forEach(set => {
      let date = new Date(set.info.startTime);
      lineChartResults.push({
        x: date.toUTCString(),
        y: set.info.chatMCS
      });
      if (!result[set.info.agentLoginName]) {
        result[set.info.agentLoginName] = {
          chatMCS: set.info.chatMCS,
          count: 1
        };
      } else {
        let agent = result[set.info.agentLoginName];
        agent.chatMCS += set.info.chatMCS;
        agent.count += 1;
      }
    });
    let allData = {
      mcsScores: [],
      agents: [],
      convos: [],
      lineChartResults
    };
    for (let key in result) {
      allData.mcsScores.push(result[key].chatMCS / result[key].count);
      allData.agents.push(key);
      allData.convos.push(result[key].count);
    }
    return allData;
  }
}
