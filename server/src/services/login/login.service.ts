import { Injectable, HttpService } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginService {
  constructor(
    private http: HttpService,
    private readonly jwtService: JwtService
  ) {}

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
      .post(url, { username, password }, headers)
      .pipe(
        map(response => {
          return response.data.bearer;
        })
      )
      .toPromise()
      .catch(err => err);
  }

  jwtSign(payload: { bearer: string; accountId: number }) {
    return { access_token: this.jwtService.sign(payload) };
  }
}
