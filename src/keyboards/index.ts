import { Markup } from 'telegraf';
import 'telegraf/types';
import { ACTIONS } from '../constants';

export const verbKeyboard = (index: number) =>
   Markup.inlineKeyboard([
      [Markup.button.callback('Show all', `${ACTIONS.SHOW}_${index}`), Markup.button.callback('Skip', ACTIONS.NEXT)]
   ]).reply_markup;
export const revealedVerbKeyboard = () =>
   Markup.inlineKeyboard([[Markup.button.callback('Next', ACTIONS.NEXT)]]).reply_markup;
