import { Chat } from 'telegraf/typings/core/types/typegram';

export interface IMsg {
   text: string;
   is_automatic_forward?: boolean;
   chat: Pick<Chat, 'type'>;
}
