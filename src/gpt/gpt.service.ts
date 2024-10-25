import { Injectable, Inject } from '@nestjs/common';
import { GPT_CLIENT, SYSTEM_PROMPT } from '../constants';
import { ICompletionMessage, IGPTClient } from '../interfaces';

@Injectable()
export class GPTService {
   constructor(@Inject(GPT_CLIENT) private readonly gptClient: IGPTClient) {}

   async complete(messages: ICompletionMessage[]) {
      messages.unshift(SYSTEM_PROMPT);
      return await this.gptClient.request({
         messages,
         stream: false,
         model: 'gpt-4o'
      });
   }
}
