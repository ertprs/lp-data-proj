export const eh_multiple_input = {
  duration: {
    name: "Duration",
    description: "Range in Seconds (60 = 1 minute): 0-1000",
    class: "duration",
    formGroupName: "duration",
    sets: [
      { name: "from", placeholder: "From", formControlName: "from" },
      { name: "to", placeholder: "To", formControlName: "to" }
    ]
  },
  chatMCS: {
    name: "Chat MCS",
    description: "Type in Chat MCS Range",
    class: "chatMCS",
    formGroupName: "chatMCS",
    sets: [
      { name: "from", placeholder: "From", formControlName: "from" },
      { name: "to", placeholder: "To", formControlName: "to" }
    ]
  },
  coBrowseDuration: {
    name: "Co-browse Duration",
    description: "Range in Seconds (60 = 1 minute)",
    class: "coBrowseDuration",
    formGroupName: "coBrowseDuration",
    sets: [
      { name: "from", placeholder: "From", formControlName: "from" },
      { name: "to", placeholder: "To", formControlName: "to" }
    ]
  }
};

export const mih_multiple_input = {
  duration: eh_multiple_input.duration,
  mcs: {
    name: "MCS",
    description: "Range of Meaningful Connection Score: 0-100",
    class: "mcs",
    formGroupName: "mcs",
    sets: [
      { name: "from", placeholder: "From", formControlName: "from" },
      { name: "to", placeholder: "To", formControlName: "to" }
    ]
  },
  csat: {
    name: "CSAT",
    description: "Range of Customer Satisfaction: 1-5",
    class: "csat",
    formGroupName: "csat",
    sets: [
      { name: "from", placeholder: "From", formControlName: "from" },
      { name: "to", placeholder: "To", formControlName: "to" }
    ]
  },
  sdeSearch: {
    name: "SDE Search",
    description: "Search Specific SDE Values",
    class: "sde-search",
    formGroupName: "sdeSearch",
    sets: [
      {
        name: "personalInfo",
        placeholder: "Personal Info",
        formControlName: "personalInfo"
      },
      {
        name: "customerInfo",
        placeholder: "Customer Info",
        formControlName: "customerInfo"
      },
      {
        name: "userUpdate",
        placeholder: "User Update",
        formControlName: "userUpdate"
      },
      {
        name: "marketingCampaignInfo",
        placeholder: "Marketing Campaign Info",
        formControlName: "marketingCampaignInfo"
      },
      { name: "lead", placeholder: "Lead", formControlName: "lead" },
      {
        name: "purchase",
        placeholder: "Purchase",
        formControlName: "purchase"
      },
      {
        name: "viewedProduct",
        placeholder: "Viewed Product",
        formControlName: "viewedProduct"
      },
      {
        name: "cartStatus",
        placeholder: "Cart Status",
        formControlName: "cartStatus"
      },
      {
        name: "serviceActivity",
        placeholder: "Service Activity",
        formControlName: "serviceActivity"
      },
      {
        name: "visitorError",
        placeholder: "Visitor Error",
        formControlName: "visitorError"
      },
      {
        name: "searchContent",
        placeholder: "Search Content",
        formControlName: "searchContent"
      }
    ]
  },
  nps: {
    name: "NPS",
    description: "Range of NPS: 0-10",
    class: "nps",
    formGroupName: "nps",
    sets: [
      { name: "from", placeholder: "From", formControlName: "from" },
      { name: "to", placeholder: "To", formControlName: "to" }
    ]
  },
  agentSurveySearch: {
    name: "Agent Survey Search",
    description: "Search Conv. According to Agent Surveys",
    class: "agent-survey-search",
    formGroupName: "agentSurveySearch",
    sets: [
      {
        name: "pendingAgentSurvey",
        placeholder: "Pending Agent Survey - True/False",
        formControlName: "pendingAgentSurvey"
      },
      {
        name: "questionId",
        placeholder: "Search Question Ids",
        formControlName: "questionId"
      },
      {
        name: "questionName",
        placeholder: "Search Question Names",
        formControlName: "questionName"
      },
      {
        name: "questionKeywords",
        placeholder: "Search Question Keywords",
        formControlName: "questionKeywords"
      },
      {
        name: "answerKeywords",
        placeholder: "Search Answer Keywords",
        formControlName: "answerKeywords"
      },
      {
        name: "surveyId",
        placeholder: "Search Survey Id",
        formControlName: "surveyId"
      }
    ]
  }
};
