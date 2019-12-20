import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ContactCenterService } from "../../services/contact-center/contact-center.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("contact-center")
export class ContactCenterController {
  constructor(private contactService: ContactCenterService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("skills")
  async getAllSkills(@Request() req) {
    // req.user comes after jwt validation in AuthGuard
    let { accountId, bearer } = req.user;
    const response = await this.contactService.getSkills(bearer, accountId);
    return response;
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("agents")
  async getAllAgents(@Request() req) {
    // req.user comes after jwt validation in AuthGuard
    let { accountId, bearer } = req.user;
    const response = await this.contactService.getAgents(bearer, accountId);
    return response;
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("agentGroups")
  async getAllAgentGroups(@Request() req) {
    // req.user comes after jwt validation in AuthGuard
    let { accountId, bearer } = req.user;
    const response = await this.contactService.getAgentGroups(
      bearer,
      accountId
    );
    return response;
  }
}
