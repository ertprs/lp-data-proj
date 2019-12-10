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
  constructor(
    private http: HttpClient,
    private processhttp: ProcessHttpmsgService
  ) { }

  public getEngHistoryData(): Observable<any> {
    let bearer = sessionStorage.getItem('bearer');
    let accountId = sessionStorage.getItem('accountId');
    console.log('from data history service:', JSON.stringify(accountId), JSON.stringify(bearer))
    return this.http.post(`${this.baseURL}api/data-history/engHistory/${accountId}/${bearer}`, {})
    .pipe(catchError(this.processhttp.handleError))
  }

  public getMsgIntHistoryData(): Observable<any> {
    let bearer = sessionStorage.getItem('bearer');
    let accountId = sessionStorage.getItem('accountId');
    console.log('from msg int history service:', JSON.stringify(accountId), JSON.stringify(bearer))
    return this.http.post(`${this.baseURL}api/data-history/msgIntHistory/${accountId}/${bearer}`, {})
    .pipe(catchError(this.processhttp.handleError))
  }
}
