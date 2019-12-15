import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from 'src/app/dashboard/services/get-data.service';

@Component({
  selector: 'app-msg-int-query',
  templateUrl: './msg-int-query.component.html',
  styleUrls: ['./msg-int-query.component.scss']
})
export class MsgIntQueryComponent implements OnInit {
  @Input()
  time = {
    sets: ["From", "To"],
    hours: [],
    minutes: [],
    periods: ['AM', 'PM']
  }
  constructor(
    private dataService: GetDataService
  ) { }

  ngOnInit() {
    this.time.hours = [...Array(12).keys()].map(x => x < 9 ? '0'+(x+1).toString() : (x+1).toString());
    this.time.minutes = [...Array(60).keys()].map(x => x < 10 ? '0'+(x).toString() : (x).toString());
    this.dataService.getSkills().subscribe((skills:any) => {
      console.log(skills)
    })

    this.dataService.getAgents().subscribe((agents:any) => {
      console.log(agents)
    })

    this.dataService.getAgentGroups().subscribe((agentGroups:any) => {
      console.log(agentGroups)
    })
  }

}
