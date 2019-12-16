import { Component, OnInit, Input, Pipe } from "@angular/core";
import { FormGroup, FormBuilder, Validator } from "@angular/forms";
import { GetDataService } from "../../../services/get-data.service";
import { drop_down_select } from "../shared/drop-down-select";
import { chained_values } from "../shared/chained-values";
import { time_start } from "../shared/time";
import { single_input } from "../shared/single-input";
import { double_input } from "../shared/double-input";

@Component({
  selector: "app-eng-hist-query",
  templateUrl: "./eng-hist-query.component.html",
  styleUrls: ["./eng-hist-query.component.scss"]
})
export class EngHistQueryComponent implements OnInit {
  @Input()
  time = time_start;
  chainedValues = chained_values;
  dropDownSelect = drop_down_select;
  singleInput = single_input;
  doubleInput = double_input;
  queryForm: FormGroup;

  constructor(private dataService: GetDataService, private fb: FormBuilder) {
    this.createForm();
    this.onValueChanged();
  }

  ngOnInit() {
    this.dataService.getSkills().subscribe((skills: any) => {
      console.log(skills);
      this.chainedValues.skills.values = skills.map(skill => {
        return { name: `${skill.id} (${skill.name})`, value: skill.id };
      });
    });

    this.dataService.getAgents().subscribe((agents: any) => {
      console.log(agents);
      this.chainedValues.agents.values = agents.map(agent => {
        return { name: `${agent.id} (${agent.loginName})`, value: agent.id };
      });
    });

    this.dataService.getAgentGroups().subscribe((agentGroups: any) => {
      console.log(agentGroups);
      this.chainedValues.agentGroups.values = agentGroups.map(group => {
        return { name: `${group.id} (${group.name})`, value: group.id };
      });
    });
  }

  createForm() {
    this.queryForm = this.fb.group({
      interactive: true,
      ended: true,
      start: this.fb.group({ 
        from: this.fb.group({
          hour: "",
          minute: "",
          period: "",
          date: ""
        }), 
        to: this.fb.group({
          hour: "",
          minute: "",
          period: "",
          date: ""
        }) 
      }),
      keyword_search_area: this.fb.group({
        types: ""
      }),
      skillIds: "",
      agentIds: "",
      agentGroupIds: "",
      duration: this.fb.group({ from: "", to: "" }),
      keyword: "",
      visitor: "",
      channel: "", 
      engagementId: "",
      alertedMcsValues: "",
      chatMCS: this.fb.group({ from: "", to: "" }),
      hasInteractiveCoBrowse: "",
      coBrowseDuration: this.fb.group({ from: "", to: "" }),
      lineContentTypes: ""
    });
    this.queryForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    let form = this.queryForm;
    console.log(form.value);
  }

  onSubmit(){
    console.log('submit')
  }

  returnZero() {
    return 0;
    }
}
