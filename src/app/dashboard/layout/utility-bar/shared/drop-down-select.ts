export const eh_drop_down_select = {
  channel: {
    name: "Channels",
    description: "Engagement Channel Id",
    class: "channel",
    formControlName: "channel",
    selectPlaceholder: "Select a Channel",
    values: [
      { name: "UNKNOWN(-1)", value: -1 },
      { name: "WEB(1)", value: 1 },
      { name: "VOICE(2)", value: 2 }
    ]
  },
  lineContentTypes: {
    name: "Line Content",
    description: "Type of Chat Line",
    class: "lineType",
    formControlName: "lineContentTypes",
    selectPlaceholder: "Select a Type",
    values: [{ name: "Rich Content", value: "RICH_CONTENT" }]
  }
};

export const mih_drop_down_select = {
  invalidFreeTextAnswer: {
    name: "Invalid Free Text Answer",
    description: "Search for Convs. w/ Invalid Free Text Answer",
    class: "invalid-free-text",
    formControlName: "invalidFreeTextAnswer",
    selectPlaceholder: "Values",
    values: [
      { name: "Invalid Free Text Answer", value: "INVALID_FREE_TEXT_ANSWER" }
    ]
  },
  surveyBotConversations: {
    name: "Survey Bot Conversations",
    description: "Search for Convs. w/ PCS",
    class: "survey-bot-conversations",
    formControlName: "surveyBotConversations",
    selectPlaceholder: "Values",
    values: [{ name: "Survey Bot", value: "SURVEY_BOT" }]
  }
};
