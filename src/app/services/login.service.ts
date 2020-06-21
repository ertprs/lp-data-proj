import { Injectable, Input } from '@angular/core';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @Input()
  username: string;
  password: string;

  constructor(
    private processhttp: ProcessHttpmsgService,
    private http: HttpClient
    ) { }

  public login(credentials: {account: number, username: string, password: string}): Observable<any> {
    const baseURL = environment.apiUrl;
    return this.http.post(baseURL+`api/login`,credentials)
    .pipe(catchError(this.processhttp.handleError))
  }
}
