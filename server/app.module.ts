import { CacheModule, Module, HttpModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { DataHistoryController } from './src/controllers/data-history/data-history.controller';
import { LoginController } from './src/controllers/login/login.controller';
import { LoginService } from './src/services/login/login.service';
import { DataHistoryService } from './src/services/data-history/data-history.service';
import { Promise } from 'es6-promise';
@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true
    }),
    CacheModule.registerAsync({
      useFactory: () => ({
        ttl: 5,
      })
    }),
    HttpModule
  ],
  controllers: [DataHistoryController, LoginController],
  providers: [
    LoginService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
    DataHistoryService
  ]
})
export class ApplicationModule {}
