import { Injectable, HttpService } from "@nestjs/common";
import { generateHeaders } from "../../utils/generateHeaders";
import { map } from "rxjs/operators";

@Injectable()
export class ContactCenterService {
  constructor(private http: HttpService) {}

  async getSkills(bearer: string, accountId: string) {
    let url = `https://va.ac.liveperson.net/api/account/${accountId}/configuration/le-users/skills`;
    let headers = generateHeaders(bearer);

    const skills = await this.http
      .get(url, { headers: headers })
      .pipe(map(response => response.data))
      .toPromise()
      .catch(err => err);
    return skills;
  }

  async getAgents(bearer: string, accountId: string) {
    let url = `https://va.ac.liveperson.net/api/account/${accountId}/configuration/le-users/users`;
    let headers = generateHeaders(bearer);

    const agents = await this.http
      .get(url, { headers: headers })
      .pipe(map(response => response.data))
      .toPromise()
      .catch(err => err);
    return agents;
  }

  async getAgentGroups(bearer: string, accountId: string) {
    let url = `https://va.ac.liveperson.net/api/account/${accountId}/configuration/le-users/agentGroups`;
    let headers = generateHeaders(bearer);

    const agentGroups = await this.http
      .get(url, { headers: headers })
      .pipe(map(response => response.data))
      .toPromise()
      .catch(err => err);
    return agentGroups;
  }
}
