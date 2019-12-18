import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ProcessHttpmsgService } from "src/app/services/process-httpmsg.service";

let baseURL = `http://localhost:4200/`;
@Injectable({
  providedIn: "root"
})
export class GetDataService {
  bearer: string = sessionStorage.getItem("bearer");
  accountId: string = sessionStorage.getItem("accountId");
  private engHistData = new BehaviorSubject<any>({});
  private msgIntHistData = new BehaviorSubject<any>({});
  currentEngHist = this.engHistData.asObservable();
  currentMsgInt = this.msgIntHistData.asObservable();

  constructor(
    private http: HttpClient,
    private processhttp: ProcessHttpmsgService
  ) {}

  public getEngHistoryData(body: {
    params: { offset?: number; limit?: number; sort?: string };
    payload;
  }): Observable<any> {
    console.log(
      "from data history service:",
      JSON.stringify(this.accountId),
      JSON.stringify(this.bearer)
    );
    
    return this.http
      .post(
        `${baseURL}api/data-history/engHistory/${this.accountId}/${this.bearer}`,
        body
      )
      .pipe(map(response => {
        this.engHistData.next(response);
        console.log(response, this.currentEngHist);
        return response;
      }))
      .pipe(catchError(this.processhttp.handleError));
  }

  public getMsgIntHistoryData(body: {
    params: { offset?: number; limit?: number; sort?: string };
    payload;
  }): Observable<any> {
    console.log(
      "from msg int history service:",
      JSON.stringify(this.accountId),
      JSON.stringify(this.bearer)
    );
    return this.http
      .post(
        `${baseURL}api/data-history/msgIntHistory/${this.accountId}/${this.bearer}`,
        body
      )
      .pipe(map(response => {
        this.msgIntHistData.next(response);
        console.log(response, this.currentMsgInt);
        return response
      }))
      .pipe(catchError(this.processhttp.handleError));
      
  }

  public getSkills(): Observable<any> {
    return this.http
      .get(
        `${baseURL}api/contact-center/skills/${this.accountId}/${this.bearer}`
      )
      .pipe(catchError(this.processhttp.handleError));
  }

  public getAgentGroups(): Observable<any> {
    return this.http
      .get(
        `${baseURL}api/contact-center/agentGroups/${this.accountId}/${this.bearer}`
      )
      .pipe(catchError(this.processhttp.handleError));
  }

  public getAgents(): Observable<any> {
    return this.http
      .get(
        `${baseURL}api/contact-center/agents/${this.accountId}/${this.bearer}`
      )
      .pipe(catchError(this.processhttp.handleError));
  }
}
