import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '../../services/login/login.service';

@Controller('login')
export class LoginController {

    constructor(private loginService: LoginService) { }

    @Post()
    async getBearerWithLogin(@Body() body: {username: string, password: string}) {
        const bearer = await this.loginService.login(body);
        console.log(bearer);
        return bearer;
    }
}
