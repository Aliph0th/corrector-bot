import { Action, Command, Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { ACTIONS, HELLO_STICKER_ID, MESSAGES, VERBS_COMMAND } from './constants';
import { GPTService } from './gpt/gpt.service';
import { ICallbackUpdate, IMsg } from './interfaces';
import { revealedVerbKeyboard, verbKeyboard } from './keyboards';
import { VerbsService } from './verbs/verbs.service';

@Update()
export class AppUpdate {
   constructor(
      private readonly gptService: GPTService,
      private readonly verbsService: VerbsService
   ) {}
   @Start()
   async onStart(@Ctx() ctx: Context) {
      await ctx.replyWithSticker(HELLO_STICKER_ID);
   }

   @Command(VERBS_COMMAND)
   async onVerbsCommand(@Ctx() ctx: Context) {
      const { forms, index } = this.verbsService.getRandomVerb();
      await ctx.replyWithHTML(MESSAGES.VERBS(forms[0]), {
         reply_markup: verbKeyboard(index)
      });
   }
   @Action(new RegExp(`^${ACTIONS.SHOW}_\\d+$`))
   async onShowAction(@Ctx() ctx: Context & ICallbackUpdate) {
      const index = +ctx.update.callback_query.data.split('_')[1];
      await ctx.editMessageText(MESSAGES.VERBS(...this.verbsService.verbs[index]), {
         parse_mode: 'HTML',
         reply_markup: revealedVerbKeyboard()
      });
      await ctx.answerCbQuery();
   }
   @Action(ACTIONS.NEXT)
   async onNextAction(@Ctx() ctx: Context) {
      const { forms, index } = this.verbsService.getRandomVerb();
      await ctx.editMessageText(MESSAGES.VERBS(forms[0]), {
         parse_mode: 'HTML',
         reply_markup: verbKeyboard(index)
      });
      await ctx.answerCbQuery();
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
