import { Controller, Post, Body, Param } from "@nestjs/common";
import { DataHistoryService } from "../../services/data-history/data-history.service";
import { EngagementHistoryBody } from "../../models/engHistModel";
import { MsgInteractionBody } from "../../models/msgIntHistModel";

@Controller("data-history")
export class DataHistoryController {
  constructor(private dataHistoryService: DataHistoryService) {}

  @Post("engHistory/:accountId/:bearer")
  async getEngHistoryData(
    @Param() params,
    @Body() body: { params; payload: EngagementHistoryBody }
  ): Promise<any> {
    const { bearer, accountId } = params;
    const response = await this.dataHistoryService.getEngHistory(
      bearer,
      accountId,
      body
    );
    return response;
  }

  @Post("msgIntHistory/:accountId/:bearer")
  async getMsgInteractionsData(
    @Param() params,
    @Body() body: { params; payload: MsgInteractionBody }
  ): Promise<any> {
    const { bearer, accountId } = params;
    const response = await this.dataHistoryService.getMsgInteractions(
      bearer,
      accountId,
      body
    );
    return response;
  }
}
