import { Module, HttpModule } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { DataHistoryController } from './src/controllers/data-history/data-history.controller';
import { LoginController } from './src/controllers/login/login.controller';
import { LoginService } from './src/services/login/login.service';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true
    }),
    HttpModule
  ],
  controllers: [DataHistoryController, LoginController],
  providers: [LoginService]
})
export class ApplicationModule {}
