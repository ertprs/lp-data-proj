import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from 'src/app/services/process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  baseURL = `http://localhost:4200/`;
  bearer: string = sessionStorage.getItem('bearer');
  accountId: string = sessionStorage.getItem('accountId');

  constructor(
    private http: HttpClient,
    private processhttp: ProcessHttpmsgService
  ) { }

  public getEngHistoryData(body: {params: { offset?: number, limit?: number, sort?: string }, payload}): Observable<any> {
    console.log('from data history service:', JSON.stringify(this.accountId), JSON.stringify(this.bearer))
    return this.http.post(`${this.baseURL}api/data-history/engHistory/${this.accountId}/${this.bearer}`, body)
    .pipe(catchError(this.processhttp.handleError))
  }

  public getMsgIntHistoryData(body: {params: { offset?: number, limit?: number, sort?: string }, payload}): Observable<any> {
    console.log('from msg int history service:', JSON.stringify(this.accountId), JSON.stringify(this.bearer))
    return this.http.post(`${this.baseURL}api/data-history/msgIntHistory/${this.accountId}/${this.bearer}`, body)
    .pipe(catchError(this.processhttp.handleError))
  }

  public getSkills(): Observable<any> {
    return this.http.get(`${this.baseURL}api/contact-center/skills/${this.accountId}/${this.bearer}`)
    .pipe(catchError(this.processhttp.handleError))
  }

  public getAgentGroups(): Observable<any> {
    return this.http.get(`${this.baseURL}api/contact-center/agentGroups/${this.accountId}/${this.bearer}`)
    .pipe(catchError(this.processhttp.handleError))
  }

  public getAgents(): Observable<any> {
    return this.http.get(`${this.baseURL}api/contact-center/agents/${this.accountId}/${this.bearer}`)
    .pipe(catchError(this.processhttp.handleError))
  }
}
