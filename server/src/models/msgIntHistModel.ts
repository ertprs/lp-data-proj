export class MsgInteractionBody {
  interactive: boolean;
  ended: boolean;
  start: { from: number; to: number };
  end?: { from: number; to: number };
  status?: string[]; // Valid values: "OPEN", "CLOSE"
  skillIds?: string[];
  latestSkillIds?: string[];
  agentIds?: string[];
  latestAgentIds?: string[];
  agentGroupIds?: string[];
  keyword?: string;
  summary?: string;
  duration?: { from: number; to: number };
  mcs?: { from: number; to: number };
  alertedMcsValues?: any[]; // Valid values: "-1", "0", "1"
  csat?: { from: number; to: number };
  source?: string[]; // APP, SHARK (WEB), AGENT, SMS, FACEBOOK, Apple Business Chat, WhatsApp Business
  device?: string[]; // Possible values: DESKTOP, TABLET, MOBILE, NA
  messageContentTypes?: string[]; // Valid values: TEXT_PLAIN, TEXT_HTML, LINK, HOSTED_FILE, IMG, SECURE_FORM_INVITATION, SECURE_FORM_SUBMIT, RICH_CONTENT
  latestConversationQueueState?: string; // Valid values: IN_QUEUE,ACTIVE
  sdeSearch?: {
    personalInfo?: string;
    customerInfo?: string;
    userUpdate?: string;
    marketingCampaignInfo?: string;
    lead?: string;
    purchase?: string;
    viewedProduct?: string;
    cartStatus?: string;
    serviceActivity?: string;
    visitorError?: string;
    searchContent?: string;
  };
  responseTime?: { from?: number; to?: number }; // Either the "from" or "to" field is mandatory
  contentToRetrieve?: any;
  latestUpdateTime?: { from?: number };
  nps?: { from?: number; to?: number };
  questionBrick?: string;
  invalidFreeTextAnswer?: string;
  surveyBotConversations?: string;
  surveyIds?: any[];
  fcr?: string[];
  questionTypeAndFormatToRetrieve?: { type: string; format: string };
  answerText?: string[];
  intentName?: string[];
  intentConfidenceScore?: number;
  conversationsWithStepUpOnly?: boolean;
  agentSurveySearch?: {
    pendingAgentSurvey?: boolean[];
    questionId?: string[];
    questionName?: string[];
    questionKeywords?: string[];
    answerKeywords?: string[];
    surveyId?: string[];
  };
}
