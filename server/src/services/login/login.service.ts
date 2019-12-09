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
    account: number;
  }): Promise<AxiosResponse> {
      const { username, password, account } = credentials;
    const url = `https://va.agentvep.liveperson.net/api/account/${account}/login?v=1.3`;
    let headers = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
    return this.http
      .post(url, {username, password}, headers)
      .pipe(map(response => {
        console.log(response.data.bearer)
        return response.data.bearer
      }))
      .toPromise()
      .catch(err => err);
  }
}
