import { Injectable, HttpService } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(private http: HttpService) {}

  login(credentials: {
    username: string;
    password: string;
  }): Promise<AxiosResponse> {
    const url = `https://va.agentvep.liveperson.net/api/account/13026445/login?v=1.3`;
    let headers = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
    return this.http
      .post(url, credentials, headers)
      .pipe(map(response => response.data.bearer))
      .toPromise()
      .catch(err => err);
  }
}
