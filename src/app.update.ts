import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { HELLO_STICKER_ID } from './constants';
import { GPTService } from './gpt/gpt.service';
import { IMsg } from './interfaces';

@Update()
export class AppUpdate {
   constructor(private readonly gptService: GPTService) {}
   @Start()
   async onStart(@Ctx() ctx: Context) {
      await ctx.replyWithSticker(HELLO_STICKER_ID);
   }
   @On('text')
   async onTextMessage(@Ctx() ctx: Context, @Message() message: IMsg) {
      const response = await this.gptService.complete([{ content: message.text, role: 'user' }]);
      await ctx.reply(response.choices[0].message.content);
   }
}
