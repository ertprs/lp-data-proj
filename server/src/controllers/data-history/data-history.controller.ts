import { Controller, Post, Body, Param } from '@nestjs/common';
import { DataHistoryService } from '../../services/data-history/data-history.service';

@Controller('data-history')
export class DataHistoryController {
    
    constructor(
       private dataHistoryService: DataHistoryService 
    ) { }

    @Post('engHistory/:accountId/:bearer')
    async getEngHistoryData(@Param() params, @Body() body: {string, from?:number, to?:number}): Promise<any> {
        const {bearer, accountId} = params;
        console.log('params: ', params)
        console.log(bearer, accountId)
        const response = await this.dataHistoryService.getEngHistory(bearer, accountId, body);
        console.log(response)
        return response;
    }

    @Post('msgIntHistory/:accountId/:bearer')
    async getMsgInteractionsData(@Param() params, @Body() body: {string, from?:number, to?:number}): Promise<any> {
        const {bearer, accountId} = params;
        console.log('params: ', params)
        console.log(bearer, accountId)
        const response = await this.dataHistoryService.getMsgInteractions(bearer, accountId, body);
        console.log(response)
        return response;
    }
}
