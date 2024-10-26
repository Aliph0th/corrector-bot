import { Logger, Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { GPTModule } from './gpt/gpt.module';
import { VerbsModule } from './verbs/verbs.module';
import { Context, MiddlewareFn } from 'telegraf';

export const errorMiddleware: MiddlewareFn<Context> = async (_, next) => {
   next().catch(error => Logger.error(error));
};

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TelegrafModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory(configService: ConfigService) {
            return {
               token: configService.getOrThrow('TOKEN'),
               middlewares: [errorMiddleware],
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
      }),
      VerbsModule
   ],
   providers: [AppUpdate]
})
export class AppModule {}
