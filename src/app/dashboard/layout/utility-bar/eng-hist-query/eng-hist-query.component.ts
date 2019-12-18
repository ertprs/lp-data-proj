import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validator } from "@angular/forms";
import { GetDataService } from "../../../services/get-data.service";
import { eh_drop_down_select } from "../shared/drop-down-select";
import { eh_chained_values } from "../shared/chained-values";
import { eh_time } from "../shared/time";
import { eh_single_input } from "../shared/single-input";
import { eh_multiple_input } from "../shared/multiple-input";
import { params } from "../shared/params";
import { eh_serializeQueryForm, eh_serializeParamForm } from '../shared/eh_serializationFns';

@Component({
  selector: "app-eng-hist-query",
  templateUrl: "./eng-hist-query.component.html",
  styleUrls: [
    "./eng-hist-query.component.scss",
    "../utility-bar.component.scss"
  ]
})
export class EngHistQueryComponent implements OnInit {
  @Input()
  time = eh_time;
  chainedValues = eh_chained_values;
  dropDownSelect = eh_drop_down_select;
  singleInput = eh_single_input;
  multipleInput = eh_multiple_input;
  params = params;
  errMess: string;
  templateQuery = {
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
    lineContentTypes: "",
    intentConfidenceScore: "",
    selectedIntentOnly: "",
    conversationsWithStepUpOnly: "",
    agentSurveySearch: this.fb.group({
      pendingAgentSurvey: "",
      questionId: "",
      questionName: "",
      questionKeywords: "",
      answerKeywords: "",
      surveyId: ""
    })
  };
  templateParam = {
    limit: 50,
    offset: 0,
    sort: ""
  };
  queryForm: FormGroup;
  paramForm: FormGroup;
  data: any;

  constructor(private dataService: GetDataService, private fb: FormBuilder) {
    this.createParamForm();
    this.createQueryForm();
    this.onValueChanged();
  }

  ngOnInit() {
    this.dataService.getSkills().subscribe((skills: any) => {
      this.chainedValues.skills.values = skills.map(skill => {
        return { name: `${skill.id} (${skill.name})`, value: skill.id };
      });
    });

    this.dataService.getAgents().subscribe((agents: any) => {
      this.chainedValues.agents.values = agents.map(agent => {
        return { name: `${agent.id} (${agent.loginName})`, value: agent.id };
      });
    });

    this.dataService.getAgentGroups().subscribe((agentGroups: any) => {
      this.chainedValues.agentGroups.values = agentGroups.map(group => {
        return { name: `${group.id} (${group.name})`, value: group.id };
      });
    });
  }

  createParamForm() {
    this.paramForm = this.fb.group(this.templateParam);
    this.paramForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  createQueryForm() {
    this.queryForm = this.fb.group(this.templateQuery);
    this.queryForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onSubmit() {
    let payload_form = eh_serializeQueryForm(this.queryForm.value);
    // console.log(`AFTER OPERATION ON FORM:`, payload_form);
    let params_form = eh_serializeParamForm(this.paramForm.value);
    this.dataService
      .getEngHistoryData({ params: params_form, payload: payload_form })
      .subscribe(
        (results: any) => {
          console.log(results);
          this.data = results;
        },
        error => {
          console.log(error);
          this.errMess =
            "The query was unsuccessful due to incorrect data or data type";
        }
      );
  }

  onValueChanged(data?: any) {
    let form = this.queryForm;
  }

  resetForm() {
    this.queryForm.reset(this.templateQuery);
    this.paramForm.reset(this.templateParam);
  }

  returnZero() {
    return 0;
  }
}
