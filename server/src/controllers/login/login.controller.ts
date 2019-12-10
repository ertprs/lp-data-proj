import {
  Controller,
  Post,
  Body,
  Get,
  Inject,
  CACHE_MANAGER, 
  Res,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { LoginService } from "../../services/login/login.service";
import { Response } from 'express';
import { throwError } from 'rxjs';

// import { Test } from '@nestjs/testing';

@Controller("login")
export class LoginController {
  constructor(
    private loginService: LoginService,
    @Inject(CACHE_MANAGER) private cacheManager
  ) {}

  @Post()
  async getBearerWithLogin(
    // @Res() res: Response,
    @Body() body: { username: string; password: string; account: number }
  ) {
    // this.cacheManager.set("accountId", body.account, () =>
    //   console.log("accountId has been set in cache")
    // );
    console.log(body)
    const bearer = await this.loginService.login(body);
    console.log(`This is bearer ${JSON.stringify(bearer)}`);
    if(bearer.name == "Error") {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized',
      }, 401);
    }
    // this.cacheManager.set("bearer", bearer, () =>
    //   console.log("bearer has been set in cache")
    // );
    return { bearer };
  }
}
