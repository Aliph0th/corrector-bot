import { Inject, Injectable, Logger } from '@nestjs/common';
import { GPT_CLIENT, SYSTEM_PROMPT } from '../constants';
import { IGPTClient } from '../interfaces';

@Injectable()
export class GPTService {
   constructor(@Inject(GPT_CLIENT) private readonly gptClient: IGPTClient) {}

   async checkForMistakes(message: string) {
      try {
         const response = await this.gptClient.request({
            messages: [{ content: `${SYSTEM_PROMPT}\n"${message}"`, role: 'user' }],
            stream: false,
            model: 'gpt-4o'
         });
         return response.choices?.[0]?.message?.content;
      } catch (error) {
         Logger.error(error);
         return null;
      }
   }
}
