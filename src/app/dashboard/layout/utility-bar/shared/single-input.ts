export const eh_single_input = {
  keyword: {
    name: "Keyword/Phrases",
    description: "Multiple phrases are not supported",
    class: "keywordPhrases",
    formControlName: "keyword",
    inputPlaceholder: "Type your keyword or key phrase"
  },
  visitor: {
    name: "Visitor Id",
    description: "Visitor Lookup",
    class: "visitor",
    formControlName: "visitor",
    inputPlaceholder: "Type a Visitor Id"
  },
  engagementId: {
    name: "Engagement Id",
    description: "Engagement Lookup",
    class: "engagement",
    formControlName: "engagementId",
    inputPlaceholder: "Type an Engagement Id"
  }
};

export const mih_single_input = {
  keyword: eh_single_input.keyword,
  summary: {
    name: "Summary",
    description: "Search Word or Phrase in Summary of Conv.",
    class: "summary",
    formControlName: "summary",
    inputPlaceholder: "Type your keyword or key phrase [no chaining]"
  },
  questionBrick: {
    name: "Question Brick",
    description: "Match Word within PCS question of brick ID",
    class: "question-brick",
    formControlName: "questionBrick",
    inputPlaceholder: "Type your keyword [no chaining]"
  },
  surveyIds: {
    name: "Surveys",
    description: "Search Surveys",
    class: "surveys",
    formControlName: "surveyIds",
    inputPlaceholder: "Type your Survey Ids"
  },
  answerText: {
    name: "Answer Text",
    description: "Search Words or Phrases from PCS Free Text Answers",
    class: "answer-text",
    formControlName: "answerText",
    inputPlaceholder: "Type your keyword or key phrase"
  },
  intentName: {
    name: "Intent Name",
    description: "Search Intent Names (Requires - contentToRetrieve[campaign, intents])",
    class: "intent-name",
    formControlName: "intentName",
    inputPlaceholder: "Type your intents"
  },
  intentConfidenceScore: {
    name: "Intent Confidence Score",
    description: "Search Confidence Score (Up to 3 Decimal Places, Requires - contentToRetrieve[messageRecords, intents])",
    class: "intent-confidence-score",
    formControlName: "intentConfidenceScore",
    inputPlaceholder: "Parameter will include x >= score"
  }
};
