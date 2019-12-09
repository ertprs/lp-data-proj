import {
  Controller,
  Post,
  Body,
  Get,
  Inject,
  CACHE_MANAGER, 
  Res
} from "@nestjs/common";
import { LoginService } from "../../services/login/login.service";
import { Response } from 'express';

// import { Test } from '@nestjs/testing';

@Controller("login")
export class LoginController {
  constructor(
    private loginService: LoginService,
    @Inject(CACHE_MANAGER) private cacheManager
  ) {}

  @Get()
  test() {
    return "some content";
  }

  @Post()
  async getBearerWithLogin(
    @Res() res: Response,
    @Body() body: { username: string; password: string; account: number }
  ) {
    this.cacheManager.set("accountId", body.account, () =>
      console.log("accountId has been set in cache")
    );
    const bearer = await this.loginService.login(body);
    console.log(bearer);
    this.cacheManager.set("bearer", bearer, () =>
      console.log("bearer has been set in cache")
    );
    res.send({ bearer});
  }
}
