import { Component, OnInit, Input, Pipe } from "@angular/core";
import { FormGroup, FormBuilder, Validator } from "@angular/forms";
import { GetDataService } from "../../../services/get-data.service";
import { drop_down_select } from "../shared/drop-down-select";
import { chained_values } from "../shared/chained-values";
import { time_start } from "../shared/time";
import { single_input } from "../shared/single-input";
import { double_input } from "../shared/double-input";
import { params } from '../shared/params';

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
  params = params;
  queryForm: FormGroup;
  paramForm: FormGroup;

  constructor(private dataService: GetDataService, private fb: FormBuilder) {
    this.createParamForm();
    this.createQueryForm();
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

  createParamForm() {
    this.paramForm = this.fb.group({
      limit: 50,
      offset: 0,
      sort: "start:desc"
    })

    this.paramForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  createQueryForm() {
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

  onSubmit() {
    console.log("submit");
    let form = this.serializeQueryForm(this.queryForm.value);
    console.log(`AFTER OPERATION ON FORM:`, form);
    let setParams = { value: { limit: 50, offset: 0, sort: "start:desc" } };
    this.dataService
      .getEngHistoryData({ params: setParams.value, payload: form })
      .subscribe(
        (results: any) => {
          console.log(results);

        },
        error => {
          console.log(error);
          // this.onValueChanged("invalid");
        }
      );
  }

  returnZero() {
    return 0;
  }

  serializeQueryForm(formValue) {
    let serialized = {}
    for (let key in formValue) {
      let value = formValue[key];
      // start, duration, chatMCS, coBrowseDuration, keyword_search_area
      if (typeof value == "object") {
        if (value.from) {
          // start
          if (typeof value.from == "object") {
            if (!value.from.date || !value.to.date) {
              serialized[key] = { from: Date.now() - 60000 * 60 * 24 * 30, to: Date.now() };
            } else {
              serialized[key] = {
                from: new Date(
                `${JSON.stringify(value.from.date).substring(0, 11)} ${value.from.hour ? value.from.hour + ":" + value.from.minute + " " + value.from.period : ""}`
              ).valueOf(),
              to: new Date(
                `${JSON.stringify(value.to.date).substring(0, 11)} ${value.to.hour ? value.to.hour + ":" + value.to.minute + " " + value.from.period : ""}`
              ).valueOf()
              };
            }
            console.log(serialized[key])
          }
          // duration, chatMCS, coBrowseDuration
          if (typeof value.from != "object") {
            if (value.from && value.to) {
              serialized[key] = { from: Number(value.from), to: Number(value.to)};
            }
          }
        }
        // keyword_search_area
        else if (key === "keyword_search_area") {
          if(value.type) {
            serialized[key] = { type: value.type.split(/,\s*/) }
          }
        }
      } else if (
        key == "agentIds" ||
        key == "agentGroupIds" ||
        key == "skillIds" ||
        key == "lineContentTypes" ||
        key == "alertedMcsValues"
      ) {
        if (value) {
          // agentIds, agentGroupIds, skillIds
          if (key != "lineContentTypes" && key != "alertedMcsValues") {
            serialized[key] = value.split(/,\s*/).map(x => Number(x));
          }
          else {
            // lineContentTypes, alertedMcsValues
            serialized[key] = Array(value);
          }
        }
      } 
      else if(typeof value == "boolean") {
        serialized[key] = value;
      }
    }
    return serialized;
  }
}
