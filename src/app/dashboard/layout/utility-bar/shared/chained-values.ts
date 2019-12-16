export const chained_values = {
    "agents": {
      name: "Agents",
      description: "Select Specific Agents",
      class: "agents",
      formControlName: "agentIds",
      inputPlaceholder: "Chain Multiple Agent Ids",
      selectPlaceholder: "Agents",
      values: []
    },
    "skills": {
      name: "Skills",
      description: "Select Specific Skills",
      class: "skills",
      formControlName: "skillIds",
      inputPlaceholder: "Chain Multiple Skill Ids",
      selectPlaceholder: "Skills",
      values: []
    },
    "agentGroups": {
      name: "Agent Groups",
      description: "Select Specific Agent Groups",
      class: "agentGroups",
      formControlName: "agentGroupIds",
      inputPlaceholder: "Chain Multiple Groups",
      selectPlaceholder: "Agent Groups",
      values: []
    },
    "lookups": {
      name: "Keyword Search",
      description: "Keyword Lookup",
      class: "keywordSearch",
      formGroupName: "keyword_search_area",
      formControlName: "types",
      inputPlaceholder: "Chain Multiple Searches",
      selectPlaceholder: "Search Values",
      values: [
        "chatLine",
        "surveyAnswer",
        "surveyQuestion",
        "visitorInfo",
        "ea.purchase",
        "ea.viewedProduct",
        "ea.cartStatus",
        "ea.serviceActivity",
        "ea.visitorError",
        "ea.lead",
        "ea.customerInfo",
        "ea.marketingCampaignInfo",
        "ea.personalInfo",
        "mcs"
      ]
    }
  };