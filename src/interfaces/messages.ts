import { CallbackQuery, Chat, Update } from 'telegraf/typings/core/types/typegram';

export interface IMsg {
   text: string;
   is_automatic_forward?: boolean;
   chat: Pick<Chat, 'type'>;
}

export interface ICallbackUpdate {
   update: Update.CallbackQueryUpdate<CallbackQuery.DataQuery>;
}
