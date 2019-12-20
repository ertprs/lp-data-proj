import { Controller, Post, Body, Request, UseGuards } from "@nestjs/common";
import { DataHistoryService } from "../../services/data-history/data-history.service";
import { EngagementHistoryBody } from "../../models/engHistModel";
import { MsgInteractionBody } from "../../models/msgIntHistModel";
import { AuthGuard } from "@nestjs/passport";

@Controller("data-history")
export class DataHistoryController {
  constructor(private dataHistoryService: DataHistoryService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("engHistory")
  async getEngHistoryData(
    @Body() body: { params; payload: EngagementHistoryBody },
    @Request() req
  ): Promise<any> {
    // req.user comes after jwt validation in AuthGuard
    const { bearer, accountId } = req.user;
    const response = await this.dataHistoryService.getEngHistory(
      bearer,
      accountId,
      body
    );
    return response;
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("msgIntHistory")
  async getMsgInteractionsData(
    @Body() body: { params; payload: MsgInteractionBody },
    @Request() req
  ): Promise<any> {
    // req.user comes after jwt validation in AuthGuard
    const { bearer, accountId } = req.user;
    const response = await this.dataHistoryService.getMsgInteractions(
      bearer,
      accountId,
      body
    );
    return response;
  }
}
