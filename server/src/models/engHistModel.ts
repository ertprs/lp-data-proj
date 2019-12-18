export class EngagementHistoryBody {
  interactive?: boolean;
  ended?: boolean;
  start?: { from: number; to: number };
  keyword_search_area?: {
    types: string[];
  };
  skillIds?: number[];
  agentIds?: number[];
  agentGroupIds?: number[];
  duration?: { from: number; to: number };
  keyword?: string;
  visitor?: string;
  channel?: any; // enum[-1(unknown), 1(web), 2(voice)]
  engagementId?: any;
  alertedMcsValues?: any;
  chatMCS?: { from: number; to: number };
  hasInteractiveCoBrowse?: boolean;
  coBrowseDuration?: { from: number; to: number };
  lineContentTypes?: string[]; // ['RICH_CONTENT'] is only valid value
}
