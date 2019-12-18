import { Component, OnInit, Input } from "@angular/core";
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

@Component({
  selector: "app-msg-int-query",
  templateUrl: "./msg-int-query.component.html",
  styleUrls: ["./msg-int-query.component.scss", "../utility-bar.component.scss"]
})
export class MsgIntQueryComponent implements OnInit {
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
      let vals = skills.map(skill => {
        return { name: `${skill.id} (${skill.name})`, value: skill.id };
      });
      this.chainedValues.skills.values = vals;
      this.chainedValues.latestSkills.values = vals;
    });

    this.dataService.getAgents().subscribe((agents: any) => {
      let vals = agents.map(agent => {
        return { name: `${agent.id} (${agent.loginName})`, value: agent.id };
      });
      this.chainedValues.agents.values = vals;
      this.chainedValues.latestAgents.values = vals;
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
    let payload_form = this.serializeQueryForm(this.queryForm.value);
    // console.log(`AFTER OPERATION ON FORM:`, payload_form);
    let params_form = this.serializeParamForm(this.paramForm.value);
    this.dataService
      .getMsgIntHistoryData({ params: params_form, payload: payload_form })
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

  serializeParamForm(formValue) {
    let serialized = {};
    for (let key in formValue) {
      let value = formValue[key];
      if (key == "sort") {
        value
          ? (serialized[key] = `start:${value}`)
          : (serialized[key] = `start:desc`);
      } else {
        serialized[key] = value;
      }
    }
    return serialized;
  }

  serializeQueryForm(formValue) {
    let serialized = {};
    for (let key in formValue) {
      let value = formValue[key];
      // start, duration, chatMCS, coBrowseDuration, keyword_search_area
      if (typeof value == "object") {
        if (value.from) {
          // start, end, responseTime,
          if (typeof value.from == "object") {
            if (!value.from.date || !value.to.date) {
              if (key == "start") {
                serialized[key] = {
                  from: Date.now() - 60000 * 60 * 24 * 30,
                  to: Date.now()
                };
              }
            } else {
              if (key == "latestUpdateTime") {
                serialized[key] = {
                  from: new Date(
                    `${JSON.stringify(value.from.date).substring(0, 11)} ${
                      value.from.hour
                        ? value.from.hour +
                          ":" +
                          value.from.minute +
                          " " +
                          value.from.period
                        : ""
                    }`
                  ).valueOf()
                };
              } else {
                serialized[key] = {
                  from: new Date(
                    `${JSON.stringify(value.from.date).substring(0, 11)} ${
                      value.from.hour
                        ? value.from.hour +
                          ":" +
                          value.from.minute +
                          " " +
                          value.from.period
                        : ""
                    }`
                  ).valueOf(),
                  to: new Date(
                    `${JSON.stringify(value.to.date).substring(0, 11)} ${
                      value.to.hour
                        ? value.to.hour +
                          ":" +
                          value.to.minute +
                          " " +
                          value.from.period
                        : ""
                    }`
                  ).valueOf()
                };
              }
            }
          }
          // duration, mcs, csat, nps
          if (typeof value.from != "object") {
            if (value.from && value.to) {
              serialized[key] = {
                from: Number(value.from),
                to: Number(value.to)
              };
            }
          }
        }
        // sdeSearch, questionTypeAndFormatToRetrieve, agentSurveySearch
        else if (!value.from) {
          if (key == "questionTypeAndFormatToRetrieve") {
            if (value.type && value.format) {
              serialized[key] = { type: value.type, format: value.format };
            }
          } else if (key == "sdeSearch") {
            for (let sde in value) {
              if (value[sde]) {
                if (!serialized[key]) serialized[key] = {};
                serialized[key][sde] = value[sde];
              }
            }
          } else if (key == "agentSurveySearch") {
            for (let item in value) {
              if (value[item]) {
                if (!serialized[key]) serialized[key] = {};
                serialized[key][item] = value[item].split(/,\s*/);
              }
            }
          }
        }
      } else if (
        key == "agentIds" ||
        key == "latestAgentIds" ||
        key == "skillIds" ||
        key == "latestSkillIds" ||
        key == "agentGroupIds" ||
        key == "alertedMcsValues" ||
        key == "source" ||
        key == "device" ||
        key == "messageContentTypes" ||
        key == "surveyIds" ||
        key == "fcr" ||
        key == "answerText" ||
        key == "intentName"
      ) {
        if (value) {
          serialized[key] = value.split(/,\s*/);
        }
      } else if (key == "intentConfidenceScore") {
        if (value) {
          serialized[key] = Number(value);
        }
      } else if (value) {
        serialized[key] = value;
      }
    }
    return serialized;
  }
}
