import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { GPTModule } from './gpt/gpt.module';

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TelegrafModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory(configService: ConfigService) {
            return {
               token: configService.getOrThrow('TOKEN'),
               launchOptions: { dropPendingUpdates: true }
            };
         }
      }),
      GPTModule.forRootAsync({
         isGlobal: true,
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory(configService: ConfigService) {
            return {
               baseURL: configService.getOrThrow('GPT_BASE_URL')
            };
         }
      })
   ],
   providers: [AppUpdate]
})
export class AppModule {}
