import { Injectable, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ProcessHttpmsgService } from "src/app/services/process-httpmsg.service";
import { isPlatformBrowser } from '@angular/common';

let baseURL = `http://localhost:4200/`;
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
    let accountId;
    if (isPlatformBrowser(this.platformId)) {
    bearer = localStorage.getItem("bearer");
    accountId = localStorage.getItem("accountId");
    }
    console.log(
      "from data history service:",
      JSON.stringify(accountId),
      JSON.stringify(bearer)
    );
    
    return this.http
      .post(
        `${baseURL}api/data-history/engHistory/${accountId}/${bearer}`,
        body
      )
      .pipe(map(response => {
        this.engHistData.next(response);
        console.log(response);
        return response;
      }))
      .pipe(catchError(this.processhttp.handleError));
  }

  public getMsgIntHistoryData(body: {
    params: { offset?: number; limit?: number; sort?: string };
    payload;
  }): Observable<any> {
    let bearer;
    let accountId;
    if (isPlatformBrowser(this.platformId)) {
    bearer = localStorage.getItem("bearer");
    accountId = localStorage.getItem("accountId");
    }
    console.log(
      "from msg int history service:",
      JSON.stringify(accountId),
      JSON.stringify(bearer)
    );
    return this.http
      .post(
        `${baseURL}api/data-history/msgIntHistory/${accountId}/${bearer}`,
        body
      )
      .pipe(map(response => {
        this.msgIntHistData.next(response);
        console.log(response);
        return response
      }))
      .pipe(catchError(this.processhttp.handleError));
      
  }

  public getSkills(): Observable<any> {
    let bearer;
    let accountId;
    if (isPlatformBrowser(this.platformId)) {
    bearer = localStorage.getItem("bearer");
    accountId = localStorage.getItem("accountId");
    }
    return this.http
      .get(
        `${baseURL}api/contact-center/skills/${accountId}/${bearer}`
      )
      .pipe(catchError(this.processhttp.handleError));
  }

  public getAgentGroups(): Observable<any> {
    let bearer;
    let accountId;
    if (isPlatformBrowser(this.platformId)) {
    bearer = localStorage.getItem("bearer");
    accountId = localStorage.getItem("accountId");
    }
    return this.http
      .get(
        `${baseURL}api/contact-center/agentGroups/${accountId}/${bearer}`
      )
      .pipe(catchError(this.processhttp.handleError));
  }

  public getAgents(): Observable<any> {
    let bearer;
    let accountId;
    if (isPlatformBrowser(this.platformId)) {
    bearer = localStorage.getItem("bearer");
    accountId = localStorage.getItem("accountId");
    }
    return this.http
      .get(
        `${baseURL}api/contact-center/agents/${accountId}/${bearer}`
      )
      .pipe(catchError(this.processhttp.handleError));
  }
}
