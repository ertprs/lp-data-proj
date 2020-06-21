import { Inject, PLATFORM_ID, Injectable } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ProcessHttpmsgService } from "src/app/services/process-httpmsg.service";
import { environment } from './../../../environments/environment';

let baseURL = environment.apiUrl;
@Injectable({
  providedIn: "root"
})
export class GetDataService {
  private engHistData = new BehaviorSubject<any>({});
  private msgIntHistData = new BehaviorSubject<any>({});
  currentEngHist = this.engHistData.asObservable();
  currentMsgInt = this.msgIntHistData.asObservable();

  constructor(
    private http: HttpClient,
    private processhttp: ProcessHttpmsgService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public getEngHistoryData(body: {
    params: { offset?: number; limit?: number; sort?: string };
    payload;
  }): Observable<any> {
    let bearer;

    if (isPlatformBrowser(this.platformId)) {
      bearer = localStorage.getItem("bearer");
    }
    return this.http
      .post(`${baseURL}api/data-history/engHistory`, body, {
        headers: { Authorization: `Bearer ${bearer}` }
      })
      .pipe(
        map(response => {
          this.engHistData.next(response);
          return response;
        })
      )
      .pipe(catchError(this.processhttp.handleError));
  }

  public getMsgIntHistoryData(body: {
    params: { offset?: number; limit?: number; sort?: string };
    payload;
  }): Observable<any> {
    let bearer;
    if (isPlatformBrowser(this.platformId)) {
      bearer = localStorage.getItem("bearer");
    }
    return this.http
      .post(`${baseURL}api/data-history/msgIntHistory`, body, {
        headers: { Authorization: `Bearer ${bearer}` }
      })
      .pipe(
        map(response => {
          this.msgIntHistData.next(response);
          return response;
        })
      )
      .pipe(catchError(this.processhttp.handleError));
  }

  public getSkills(): Observable<any> {
    let bearer;
    if (isPlatformBrowser(this.platformId)) {
      bearer = localStorage.getItem("bearer");
    }
    return this.http
      .get(`${baseURL}api/contact-center/skills`, {
        headers: { Authorization: `Bearer ${bearer}` }
      })
      .pipe(catchError(this.processhttp.handleError));
  }

  public getAgentGroups(): Observable<any> {
    let bearer;
    if (isPlatformBrowser(this.platformId)) {
      bearer = localStorage.getItem("bearer");
    }
    return this.http
      .get(`${baseURL}api/contact-center/agentGroups`, {
        headers: { Authorization: `Bearer ${bearer}` }
      })
      .pipe(catchError(this.processhttp.handleError));
  }

  public getAgents(): Observable<any> {
    let bearer;
    if (isPlatformBrowser(this.platformId)) {
      bearer = localStorage.getItem("bearer");
    }
    return this.http
      .get(`${baseURL}api/contact-center/agents`, {
        headers: { Authorization: `Bearer ${bearer}` }
      })
      .pipe(catchError(this.processhttp.handleError));
  }
}
