import {
  Injectable,
  Inject,
  HttpService,
  CacheKey,
  CACHE_MANAGER
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map, delay } from "rxjs/operators";
import { AxiosResponse } from "axios";
import { generateHeaders } from "../../utils/generateHeaders";

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
    body: { from?: number; to?: number }
  ): Promise<any> {
    let { from, to } = body;
    //start time for test - set to default upon load but bring in from body when selected by user
    !from ? (from = Date.now() - 60000 * 60 * 24 * 30) : from; // 1 months of data
    // end time for test - current time set to default but bring in from body as selected by user
    !to ? (to = Date.now()) : to;
    // let response = await this.cacheManager.mget(key1, key2,async (err, result) => { })
    let sort = 'start:desc'
    const headers = generateHeaders(bearer);
    const payload = {
      interactive: true,
      ended: true,
      start: {
        from,
        to
      }
    };
    let url = `https://va.enghist.liveperson.net/interaction_history/api/account/${accountId}/interactions/search?sort=${sort}`;
    console.log("hit eng history service");
    const engHistData = await this.http
      .post(url, payload, { headers: headers })
      .pipe(map(response => response.data))
      .toPromise()
      .catch(err => err);
    console.log(engHistData);
    return engHistData;
  }

  async getMsgInteractions(
    bearer: string,
    accountId: string,
    body: { from?: number; to?: number }
  ): Promise<any> {
    let { from, to } = body;
    //start time for test - set to default upon load but bring in from body when selected by user
    !from ? (from = Date.now() - 60000 * 60 * 24 * 30) : from; // 1 months of data
    // end time for test - current time set to default but bring in from body as selected by user
    !to ? (to = Date.now()) : to;
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
    let url = `https://va.msghist.liveperson.net/messaging_history/api/account/${accountId}/conversations/search?`;
    console.log("hit msg interaction service");
    const msgIntHistData = await this.http
      .post(url, payload, { headers: headers })
      .pipe(map(response => response.data))
      .toPromise()
      .catch(err => err);
    console.log(msgIntHistData);
    return msgIntHistData;
  }
}
