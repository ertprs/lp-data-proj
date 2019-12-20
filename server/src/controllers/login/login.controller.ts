import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { LoginService } from "../../services/login/login.service";

@Controller("login")
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async getBearerWithLogin(
    @Body() body: { username: string; password: string; account: number }
  ) {
    const bearer: any = await this.loginService.login(body);
    if (bearer.name == "Error") {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "Unauthorized"
        },
        401
      );
    } else {
      const token = await this.loginService.jwtSign({
        bearer,
        accountId: body.account
      });
      return { bearer: token.access_token };
    }
  }
}
