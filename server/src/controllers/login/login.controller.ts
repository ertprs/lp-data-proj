import {
  Controller,
  Post,
  Body,
  Inject,
  CACHE_MANAGER,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { LoginService } from "../../services/login/login.service";

@Controller("login")
export class LoginController {
  constructor(
    private loginService: LoginService,
    @Inject(CACHE_MANAGER) private cacheManager
  ) {}

  @Post()
  async getBearerWithLogin(
    @Body() body: { username: string; password: string; account: number }
  ) {
    const bearer: any = await this.loginService.login(body);
    console.log(`This is bearer ${JSON.stringify(bearer)}`);
    if (bearer.name == "Error") {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "Unauthorized"
        },
        401
      );
    }
    return { bearer };
  }
}
