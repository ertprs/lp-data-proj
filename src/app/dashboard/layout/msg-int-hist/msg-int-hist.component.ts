import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { GetDataService } from "../../services/get-data.service";

@Component({
  selector: "app-msg-int-hist",
  templateUrl: "./msg-int-hist.component.html",
  styleUrls: ["./msg-int-hist.component.scss"]
})
export class MsgIntHistComponent implements OnInit {

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

  constructor(private dataService: GetDataService) {
    this.dataService.getMsgIntHistoryData().subscribe(
      (msgIntData: any) => {
        console.log(msgIntData);
        this.lineChartData = [
          {
            data: this.parseData(msgIntData),
            label: "mcs"
          }
        ];
      },
      err => `Observer received an error`
    );
  }

  ngOnInit() {}

  public parseData(data) {
    const result = data.conversationHistoryRecords.map(set => {
      let date = new Date(set.info.startTime);
      console.log(date);
      return {
        x: date,
        y: set.info.mcs
      };
    });
    return result;
  }
}
