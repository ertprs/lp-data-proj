import { Component, OnInit, Input } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, Label, SingleDataSet } from "ng2-charts";
import { GetDataService } from "../../services/get-data.service";
import * as moment from "moment";
import { preserveWhitespacesDefault } from "@angular/compiler";
import { bindCallback } from "rxjs";
@Component({
  selector: "app-msg-int-hist",
  templateUrl: "./msg-int-hist.component.html",
  styleUrls: ["./msg-int-hist.component.scss", "../layout.component.scss"]
})
export class MsgIntHistComponent implements OnInit {
  @Input()
  data;
  params = {
    offset: 0,
    limit: 50,
    sort: 'start:desc'
  }
  payload = {
    interactive: true,
    ended: true,
    start: {
      from: Date.now() - 60000 * 60 * 24 * 30,
      to: Date.now()
    }
  }

  public lineChartData: ChartDataSets[] = [{ data: [], label: "mcs" }];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    title: {
      display: true,
      text: "Chronology of MCS Scores"
    },
    legend: {
      display: false,
      align: "start"
    },
    responsive: true,
    spanGaps: true,
    elements: {
      point: {
        radius: 1
      },
      line: {
        fill: true,
        borderColor: "black",
        borderWidth: "3"
      }
    },
    scales: {
      xAxes: [
        {
          responsive: true,
          scaleLabel: {
            display: true,
            labelString: "Number of Scores"
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
        "rgb(213, 72, 72)",
        "rgb(233, 158, 82)",
        "rgb(238, 238, 87)",
        "rgb(51, 130, 208)",
        "rgb(163, 114, 211)"
      ]
    },
    {
      borderColor: "black",
      backgroundColor: "blue"
    }
  ];
  public lineChartLegend = {
    display: false
  };
  public lineChartType = "line";
  public lineChartPlugins = [];

  public polarAreaChartLabels = [];
  public polarAreaChartData = [];

  public polarAreaLegend = true;
  public polarAreaOptions = {
    title: {
      display: true,
      text: "Chats by Skill"
    },
    elements: {
      arc: {
        backgroundColor: [
          "rgba(255, 0, 0, 0.6)",
          "rgba(0, 255,200, 0.6)",
          "rgba(200, 0, 200, 0.6)",
          "rgba(0, 255, 0, 0.6)"
        ],
        borderColor: "white"
      }
    },
    responsive: true,
    startAngle: -Math.PI / 4,
    legend: {
      position: "left"
    },
    animation: {
      animateRotate: true
    }
  };

  public polarAreaChartType: ChartType = "polarArea";

  constructor(private dataService: GetDataService) {}

  ngOnInit() {
    this.dataService.getMsgIntHistoryData({ params: this.params, payload: this.payload }).subscribe(
      (msgIntData: any) => {
        console.log(msgIntData);
        let response = this.getMsgScoresByAgent(msgIntData);
        this.data = msgIntData;
        this.lineChartData = response.lineResult;
        this.lineChartLabels = [...Array(response.len).keys()].map(x =>
          x.toString()
        );
        this.polarAreaChartLabels = Object.keys(response.polarResult);
        this.polarAreaChartData = Object.values(response.polarResult).map(x =>
          Number(x)
        );
      },
      err => `Observer received an error`
    );
  }

  public getMsgScoresByAgent(data) {
    let lineResult = [];
    let len = 0;
    let polarResult = {};
    data.conversationHistoryRecords.forEach(set => {
      if (set.agentParticipants.length) {
        let setData = {
          data: [],
          label: `${set.agentParticipants[0].agentFullName} at ${moment(new Date(set.info.startTime)).format('MM-DD-YYYY hh:MM a')}`
        };
        if (set.messageScores.length > len) {
          len = set.messageScores.length;
        }
        set.messageScores.forEach(score => {
          setData.data.push(score.mcs);
        });
        lineResult.push(setData);
      }
      if (polarResult[set.info.latestSkillName]) {
        polarResult[set.info.latestSkillName]++;
      } else {
        polarResult[set.info.latestSkillName] = 1;
      }
    });
    return { lineResult, len, polarResult };
  }
}
