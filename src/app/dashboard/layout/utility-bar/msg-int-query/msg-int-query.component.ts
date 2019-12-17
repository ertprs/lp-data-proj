import { Component, OnInit, Input, Pipe } from "@angular/core";
import { FormGroup, FormBuilder, Validator } from "@angular/forms";
import { GetDataService } from "../../../services/get-data.service";
import { mih_drop_down_select } from "../shared/drop-down-select";
import { mih_chained_values, mih_chained_values_2 } from "../shared/chained-values";
import { mih_time } from "../shared/time";
import { mih_single_input } from "../shared/single-input";
import { mih_multiple_input } from "../shared/multiple-input";
import { params } from '../shared/params';
import { mih_double_select } from '../shared/double-select';

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
      from: "", 
      to: "" 
    }),
    status: "", // Valid values: "OPEN", "CLOSE"
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
    alertedMcsValues: "", // Valid values: "-1", "0", "1"
    csat: this.fb.group({ 
      from: "", 
      to: "" 
    }),
    source: "", // APP, SHARK (WEB), AGENT, SMS, FACEBOOK, Apple Business Chat, WhatsApp Business
    device: "", // Possible values: DESKTOP, TABLET, MOBILE, NA
    messageContentTypes: "", // Valid values: TEXT_PLAIN, TEXT_HTML, LINK, HOSTED_FILE, IMG, SECURE_FORM_INVITATION, SECURE_FORM_SUBMIT, RICH_CONTENT
    latestConversationQueueState: "", // Valid values: IN_QUEUE,ACTIVE
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
      from: "", 
      to: "" 
    }), // Either the "from" or "to" field is mandatory
    contentToRetrieve: "",
    latestUpdateTime: "",
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
    sort: "start:desc"
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
      // console.log(skills);
      let vals = skills.map(skill => {
        return { name: `${skill.id} (${skill.name})`, value: skill.id };
      });
      this.chainedValues.skills.values = vals;
      this.chainedValues.latestSkills.values = vals;
    });

    this.dataService.getAgents().subscribe((agents: any) => {
      // console.log(agents);
      let vals = agents.map(agent => {
        return { name: `${agent.id} (${agent.loginName})`, value: agent.id };
      });
      this.chainedValues.agents.values = vals;
      this.chainedValues.latestAgents.values = vals;
    });
  }

  createParamForm() {
    this.paramForm = this.fb.group(this.templateParam)
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
          this.errMess = "The query was unsuccessful due to incorrect data or data type"
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
      if(key == "sort") {
        value ? serialized[key] = `start:${value}` : serialized[key] = `start:desc`
      } else {
        serialized[key] = value;
      }
    }
    return serialized;
  }

  serializeQueryForm(formValue) {
    let serialized = {}
    // for (let key in formValue) {
    //   let value = formValue[key];
    //   // start, duration, chatMCS, coBrowseDuration, keyword_search_area
    //   if (typeof value == "object") {
    //     if (value.from) {
    //       // start
    //       if (typeof value.from == "object") {
    //         if (!value.from.date || !value.to.date) {
    //           serialized[key] = { from: Date.now() - 60000 * 60 * 24 * 30, to: Date.now() };
    //         } else {
    //           serialized[key] = {
    //             from: new Date(
    //             `${JSON.stringify(value.from.date).substring(0, 11)} ${value.from.hour ? value.from.hour + ":" + value.from.minute + " " + value.from.period : ""}`
    //           ).valueOf(),
    //           to: new Date(
    //             `${JSON.stringify(value.to.date).substring(0, 11)} ${value.to.hour ? value.to.hour + ":" + value.to.minute + " " + value.from.period : ""}`
    //           ).valueOf()
    //           };
    //         }
    //       }
    //       // duration, chatMCS, coBrowseDuration
    //       if (typeof value.from != "object") {
    //         if (value.from && value.to) {
    //           serialized[key] = { from: Number(value.from), to: Number(value.to)};
    //         }
    //       }
    //     }
    //     // keyword_search_area
    //     else if (key === "keyword_search_area") {
    //       if(value.type) {
    //         serialized[key] = { type: value.type.split(/,\s*/) }
    //       }
    //     }
    //   } else if (
    //     key == "agentIds" ||
    //     key == "agentGroupIds" ||
    //     key == "skillIds" ||
    //     key == "lineContentTypes" ||
    //     key == "alertedMcsValues"
    //   ) {
    //     if (value) {
    //       // agentIds, agentGroupIds, skillIds
    //       if (key != "lineContentTypes" && key != "alertedMcsValues") {
    //         serialized[key] = value.split(/,\s*/).map(x => Number(x));
    //       }
    //       else {
    //         // lineContentTypes, alertedMcsValues
    //         serialized[key] = Array(value);
    //       }
    //     }
    //   } 
    //   else if(value) {
    //     serialized[key] = value;
    //   }
    // }
    return serialized;
  }
}
