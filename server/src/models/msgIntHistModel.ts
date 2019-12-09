export class MsgInteractionBody {
    interactive: boolean;
    ended: boolean;
    start: { from: number, to: number };
    end?: { from: number, to: number };
    status?: string[]; // Valid values: "OPEN", "CLOSE"
    skillIds?: number[];
    latestSkillIds?: number[];
    agentIds?: number[];
    latestAgentIds?: number[];
    agentGroupIds?: number[];
    keyword?: string;
    summary?: string;
    duration?: { from: number, to: number };
    mcs?: { from: number,to: number }; 
    alertedMcsValues?: any[]; // Valid values: "-1", "0", "1"
    csat?: { from: number, to: number };
    source?: string[]; // APP, SHARK (WEB), AGENT, SMS, FACEBOOK, Apple Business Chat, WhatsApp Business
    device?: string[]; // Possible values: DESKTOP, TABLET, MOBILE, NA
    messageContentaTypes?: string[]; // Valid values: TEXT_PLAIN, TEXT_HTML, LINK, HOSTED_FILE, IMG, SECURE_FORM_INVITATION, SECURE_FORM_SUBMIT, RICH_CONTENT
    latestConversationQueueState?: string; // Valid values: IN_QUEUE,ACTIVE
    responseTime?: { from?: number, to?: number }; // Either the "from" or "to" field is mandatory
    contentToRetrieve?: any;
    latestUpdateTime?: any;
    nps?: { from?: number, to?: number };
    surveyBotConversations?: string;
    surveyIds?: any[];
    fcr?: string[];
    questionTypeAndFormatToRetrieve?: { type: string, format: string };
    answerText?: string[];
    intentName?: string[];
};