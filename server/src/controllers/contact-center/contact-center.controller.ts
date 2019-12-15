import { Controller, Get, Body, Param } from '@nestjs/common';
import { ContactCenterService } from '../../services/contact-center/contact-center.service';

@Controller('contact-center')
export class ContactCenterController {

    constructor(
        private contactService: ContactCenterService
    ) {}

    @Get('skills/:accountId/:bearer')
    async getAllSkills(@Param() params) {
        let { accountId, bearer } = params;
        const response = await this.contactService.getSkills(bearer, accountId);
        return response;
    }

    @Get('agents/:accountId/:bearer')
    async getAllAgents(@Param() params) {
        let { accountId, bearer } = params;
        const response = await this.contactService.getAgents(bearer, accountId);
        return response;
    }

    @Get('agentGroups/:accountId/:bearer')
    async getAllAgentGroups(@Param() params) {
        let { accountId, bearer } = params;
        const response = await this.contactService.getAgentGroups(bearer, accountId);
        console.log(response)
        return response;
    }
}
