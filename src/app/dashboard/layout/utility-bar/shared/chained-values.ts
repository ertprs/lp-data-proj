export const eh_chained_values = {
  agents: {
    name: "Agents",
    description: "Select Specific Agents",
    class: "agents",
    formControlName: "agentIds",
    inputPlaceholder: "Chain Multiple Agent Ids",
    selectPlaceholder: "Agents",
    values: []
  },
  skills: {
    name: "Skills",
    description: "Select Specific Skills",
    class: "skills",
    formControlName: "skillIds",
    inputPlaceholder: "Chain Multiple Skill Ids",
    selectPlaceholder: "Skills",
    values: []
  },
  agentGroups: {
    name: "Agent Groups",
    description: "Select Specific Agent Groups",
    class: "agentGroups",
    formControlName: "agentGroupIds",
    inputPlaceholder: "Chain Multiple Groups",
    selectPlaceholder: "Agent Groups",
    values: []
  },
  lookups: {
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
  },
  alertedMcsValues: {
    name: "Alerted MCS Values",
    description: "Alerted MCS of the Chat",
    class: "alertedMCS",
    formControlName: "alertedMcsValues",
    inputPlaceholder: "Chain Multiple Searches",
    selectPlaceholder: "Select an MCS Value",
    values: [
      { name: "-1", value: -1 },
      { name: "0", value: 0 },
      { name: "1", value: 1 }
    ]
  }
};

export const mih_chained_values = {
  agents: eh_chained_values.agents,
  skills: eh_chained_values.skills,
  latestSkills: {
    name: "Latest Skills",
    description: "Select Specific Skills",
    class: "latest-skills",
    formControlName: "latestSkillIds",
    inputPlaceholder: "Chain Multiple Skill Ids",
    selectPlaceholder: "Skills",
    values: []
  },
  latestAgents: {
    name: "Latest Agents",
    description: "Select Specific Agents",
    class: "latest-agents",
    formControlName: "latestAgentIds",
    inputPlaceholder: "Chain Multiple Agent Ids",
    selectPlaceholder: "Agents",
    values: []
  },
  agentGroups: eh_chained_values.agentGroups,
  alertedMcsValues: eh_chained_values.alertedMcsValues
};

export const mih_chained_values_2 = {
  status: {
    name: "Status",
    descsription: "Open and/or Closed",
    class: "status",
    formControlName: "status",
    inputPlaceholder: "Chain Multiple Statuses",
    selectPlaceholder: "Status",
    values: ["OPEN", "CLOSE"]
  },
  source: {
    name: "Source",
    description: "Select Specific Sources",
    class: "source",
    formControlName: "source",
    inputPlaceholder: "Chain Multiple Sources",
    selectPlaceholder: "Sources",
    values: [
      "APP",
      "SHARK (WEB)",
      "AGENT",
      "SMS",
      "FACEBOOK",
      "Apple Business Chat",
      "WhatsApp Business"
    ]
  },
  device: {
    name: "Device",
    description: "Select Specific Devices",
    class: "device",
    formControlName: "device",
    inputPlaceholder: "Chain Multiple Devices",
    selectPlaceholder: "Devices",
    values: ["DESKTOP", "TABLET", "MOBILE", "NA"]
  },
  messageContentTypes: {
    name: "Message Content Types",
    description: "Select Content Types for Messaging",
    class: "content-type",
    formControlName: "messageContentTypes",
    inputPlaceholder: "Chain Multiple Content Types",
    selectPlaceholder: "Types",
    values: [
      "TEXT_PLAIN",
      "TEXT_HTML",
      "LINK",
      "HOSTED_FILE",
      "IMG",
      "SECURE_FORM_INVITATION",
      "SECURE_FORM_SUBMIT",
      "RICH_CONTENT"
    ]
  },
  latestConversationQueueState: {
    name: "Latest Conversation Queue State",
    description: "Queue State of Conv.",
    class: "queue-state",
    formControlName: "latestConversationQueueState",
    inputPlaceholder: "Chain Multiple Queue States",
    selectPlaceholder: "States",
    values: ["IN_QUEUE", "ACTIVE"]
  },
  contentToRetrieve: {
    name: "Content To Retrieve",
    description: "Select Content To Retrieve",
    class: "content-to-retrieve",
    formControlName: "contentToRetrieve",
    inputPlaceholder: "Chain Multiple Content-Retrieved Types",
    selectPlaceholder: "Types",
    values: [
      "campaign",
      "messageRecords",
      "agentParticipants",
      "agentParticipantsLeave",
      "agentParticipantsActive",
      "consumerParticipants",
      "transfers",
      "interactions",
      "messageScores",
      "messageStatuses",
      "conversationSurveys",
      "coBrowseSessions",
      "summary",
      "sdes",
      "unAuthSdes",
      "monitoring",
      "dialogs",
      "responseTime",
      "skillChanges",
      "intents",
      "latestAgentSurvey",
      "previouslySubmittedAgentSurveys"
    ]
  }
};
