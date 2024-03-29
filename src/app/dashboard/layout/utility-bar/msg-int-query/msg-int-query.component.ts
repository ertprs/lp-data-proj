import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validator } from "@angular/forms";
import { GetDataService } from "../../../services/get-data.service";
import { mih_drop_down_select } from "../shared/drop-down-select";
import {
  mih_chained_values,
  mih_chained_values_2
} from "../shared/chained-values";
import { mih_time } from "../shared/time";
import { mih_single_input } from "../shared/single-input";
import { mih_multiple_input } from "../shared/multiple-input";
import { params } from "../shared/params";
import { mih_double_select } from "../shared/double-select";
import {
  mih_serializeQueryForm,
  mih_serializeParamForm
} from "../utils/mih_serializationFns";
import { MatDrawer } from '@angular/material';

@Component({
  selector: "app-msg-int-query",
  templateUrl: "./msg-int-query.component.html",
  styleUrls: ["./msg-int-query.component.scss", "../utility-bar.component.scss"]
})
export class MsgIntQueryComponent implements OnInit {
  @ViewChild('drawer', {static: false}) public drawer: MatDrawer;
  @Input()
  time = mih_time;
  chainedValues = mih_chained_values;
  chainedValues2 = mih_chained_values_2;
  dropDownSelect = mih_drop_down_select;
  singleInput = mih_single_input;
  multipleInput = mih_multiple_input;
  doubleSelect = mih_double_select;
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
    end: this.fb.group({
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
    status: "",
    skillIds: "",
    latestSkillIds: "",
    agentIds: "",
    latestAgentIds: "",
    agentGroupIds: "",
    keyword: "",
    summary: "",
    duration: this.fb.group({
      from: "",
      to: ""
    }),
    mcs: this.fb.group({
      from: "",
      to: ""
    }),
    alertedMcsValues: "",
    csat: this.fb.group({
      from: "",
      to: ""
    }),
    source: "",
    device: "",
    messageContentTypes: "",
    latestConversationQueueState: "",
    sdeSearch: this.fb.group({
      personalInfo: "",
      customerInfo: "",
      userUpdate: "",
      marketingCampaignInfo: "",
      lead: "",
      purchase: "",
      viewedProduct: "",
      cartStatus: "",
      serviceActivity: "",
      visitorError: "",
      searchContent: ""
    }),
    responseTime: this.fb.group({
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
    contentToRetrieve: "",
    latestUpdateTime: this.fb.group({
      from: this.fb.group({
        hour: "",
        minute: "",
        period: "",
        date: ""
      })
    }),
    nps: this.fb.group({
      from: "",
      to: ""
    }),
    questionBrick: "",
    invalidFreeTextAnswer: "",
    surveyBotConversations: "",
    surveyIds: "",
    fcr: "",
    questionTypeAndFormatToRetrieve: this.fb.group({
      type: "",
      format: ""
    }),
    answerText: "",
    intentName: "",
    intentConfidenceScore: "",
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

  constructor(private dataService: GetDataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.createParamForm();
    this.createQueryForm();
    this.onValueChanged();
    this.dataService.getSkills().subscribe((skills: any) => {
      if (skills.length) {
        let vals = skills.map(skill => {
          return { name: `${skill.id} (${skill.name})`, value: skill.id };
        });
        this.chainedValues.skills.values = vals;
        this.chainedValues.latestSkills.values = vals;
      }
    });

    this.dataService.getAgents().subscribe((agents: any) => {
      if (agents.length) {
        let vals = agents.map(agent => {
          return { name: `${agent.id} (${agent.loginName})`, value: agent.id };
        });
        this.chainedValues.agents.values = vals;
        this.chainedValues.latestAgents.values = vals;
      }
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
    let payload_form = mih_serializeQueryForm(this.queryForm.value);
    let params_form = mih_serializeParamForm(this.paramForm.value);
    this.dataService
      .getMsgIntHistoryData({ params: params_form, payload: payload_form })
      .subscribe(
        (results: any) => {
          console.log(results)
          if (results.name && results.name == "Error") {
            this.errMess =
              "The query was unsuccessful due to incorrect data or data type";
          }
          else {
            this.data = results;
            this.drawer.close();
          }
        },
        error => {
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
