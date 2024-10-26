import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { HELLO_STICKER_ID, MESSAGES } from './constants';
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
   async onTextMessage(@Ctx() ctx: Context, @Message() msg: IMsg) {
      const answer = await this.gptService.checkForMistakes(msg.text);
      if (msg.chat.type === 'supergroup' && !msg.is_automatic_forward) {
         return;
      }
      if (!answer) {
         await ctx.reply(MESSAGES.CANNOT_REPLY);
         return;
      }
      await ctx.reply(answer, { reply_parameters: { message_id: ctx.message.message_id } });
   }
}
