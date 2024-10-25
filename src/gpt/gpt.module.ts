import { DynamicModule, Provider, Module } from '@nestjs/common';
import { GPT_CLIENT } from '../constants';
import { GPTClient } from './gpt.client';
import { GPTModuleAsyncOptions } from '../interfaces';
import { GPTService } from './gpt.service';

@Module({
   providers: [GPTService],
   exports: [GPTService]
})
export class GPTModule {
   static forRootAsync(options: GPTModuleAsyncOptions): DynamicModule {
      return {
         module: GPTModule,
         global: options.isGlobal,
         imports: options.imports,
         providers: [this.createServiceProvider(options)]
      };
   }

   private static createServiceProvider(options: GPTModuleAsyncOptions): Provider {
      return {
         provide: GPT_CLIENT,
         async useFactory(...args: any[]) {
            const opts = await options.useFactory(...args);
            const client = new GPTClient(opts);
            return client;
         },
         inject: options.inject
      };
   }
}
