import {
  Injectable,
  Inject,
  HttpService,
  CacheKey,
  CACHE_MANAGER
} from "@nestjs/common";
import { map, delay } from "rxjs/operators";
import { generateHeaders } from "../../utils/generateHeaders";
import { EngagementHistoryBody } from '../../models/engHistModel';
import { MsgInteractionBody } from '../../models/msgIntHistModel';
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
      sort?: string,
    offset?: number,
    limit?: number
    }, 
    payload: EngagementHistoryBody
  } 
  ): Promise<any> {
    let { from, to } = body.payload.start;
    let { sort, offset, limit } = body.params;
    //start time for test - set to default upon load but bring in from body when selected by user
    // !from ? (from = Date.now() - 60000 * 60 * 24 * 30) : from; // 1 month of data
    // end time for test - current time set to default but bring in from body as selected by user
    // !to ? (to = Date.now()) : to;
    // let response = await this.cacheManager.mget(key1, key2,async (err, result) => { })
    const headers = generateHeaders(bearer);
    const payload = {
      interactive: true,
      ended: true,
      start: {
        from,
        to
      }
    };
    let url = `https://va.enghist.liveperson.net/interaction_history/api/account/${accountId}/interactions/search?offset=${offset?offset:0}&limit=${limit?limit:100}&sort=${sort?sort:'start:desc'}`;
    // console.log("hit eng history service");
    const engHistData = await this.http
      .post(url, payload, { headers: headers })
      .pipe(map(response => response.data))
      .toPromise()
      .catch(err => err);
    // console.log(engHistData);
    return engHistData;
  }

  async getMsgInteractions(
    bearer: string,
    accountId: string,
    body: { 
      params: {
      sort?: string,
    offset?: number,
    limit?: number
    }, 
    payload: MsgInteractionBody
  }
  ): Promise<any> {
    let { from, to } = body.payload.start;
    let { sort, offset, limit } = body.params;
    //start time for test - set to default upon load but bring in from body when selected by user
    // !from ? (from = Date.now() - 60000 * 60 * 24 * 30) : from; // 1 month of data
    // end time for test - current time set to default but bring in from body as selected by user
    // !to ? (to = Date.now()) : to;
    // let response = await this.cacheManager.mget(key1, key2,async (err, result) => { })
    const headers = generateHeaders(bearer);
    const payload = {
      interactive: true,
      ended: true,
      start: {
        from,
        to
      }
    };
    let url = `https://va.msghist.liveperson.net/messaging_history/api/account/${accountId}/conversations/search?v=2&offset=${offset?offset:0}&limit=${limit?limit:100}&sort=${sort?sort:'start:desc'}`;
    // console.log("hit msg interaction service");
    const msgIntHistData = await this.http
      .post(url, payload, { headers: headers })
      .pipe(map(response => response.data))
      .toPromise()
      .catch(err => err);
    // console.log(msgIntHistData);
    return msgIntHistData;
  }
}
