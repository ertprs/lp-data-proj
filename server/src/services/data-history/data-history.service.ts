import {
  Injectable,
  Inject,
  HttpService,
  CacheKey,
  CACHE_MANAGER
} from "@nestjs/common";
import { map } from "rxjs/operators";
import { generateHeaders } from "../../utils/generateHeaders";
import { EngagementHistoryBody } from "../../models/engHistModel";
import { MsgInteractionBody } from "../../models/msgIntHistModel";
@Injectable()
@CacheKey("bearer")
@CacheKey("accountId")
export class DataHistoryService {
  constructor(
    private http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager
  ) {}

  async getEngHistory(
    bearer: string,
    accountId: string,
    body: {
      params: {
        sort?: string;
        offset?: number;
        limit?: number;
      };
      payload: EngagementHistoryBody;
    }
  ): Promise<any> {
    let { payload, params } = body;
    let { sort, offset, limit } = params;

    const headers = generateHeaders(bearer);
    console.log(
      `FROM ENG HISTORY API: ${JSON.stringify(payload)}`,
      headers,
      params
    );
    let url = `https://va.enghist.liveperson.net/interaction_history/api/account/${accountId}/interactions/search?offset=${
      offset ? offset : 0
    }&limit=${limit ? limit : 100}&sort=${sort ? sort : "start:desc"}`;

    const engHistData = await this.http
      .post(url, payload, { headers: headers })
      .pipe(map(response => response.data))
      .toPromise()
      .catch(err => err);
    return engHistData;
  }

  async getMsgInteractions(
    bearer: string,
    accountId: string,
    body: {
      params: {
        sort?: string;
        offset?: number;
        limit?: number;
      };
      payload: MsgInteractionBody;
    }
  ): Promise<any> {
    let { payload, params } = body;
    let { sort, offset, limit } = params;

    const headers = generateHeaders(bearer);

    console.log(
      `FROM MSG INTERACTIONS API: ${JSON.stringify(payload)}`,
      headers,
      params
    );
    let url = `https://va.msghist.liveperson.net/messaging_history/api/account/${accountId}/conversations/search?v=2&offset=${
      offset ? offset : 0
    }&limit=${limit ? limit : 100}&sort=${sort ? sort : "start:desc"}`;

    const msgIntHistData = await this.http
      .post(url, payload, { headers: headers })
      .pipe(map(response => response.data))
      .toPromise()
      .catch(err => err);
    return msgIntHistData;
  }
}
