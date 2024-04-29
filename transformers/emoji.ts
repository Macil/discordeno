import { Bot } from "../bot.ts";
import { DiscordEmoji } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";
import { EmojiToggles } from "./toggles/emoji.ts";

export function transformEmoji(bot: Bot, payload: DiscordEmoji) {
  const emoji = {
    id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    name: payload.name || undefined,
    roles: payload.roles?.map((id: string) => bot.transformers.snowflake(id)),
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    toggles: new EmojiToggles(payload),
  };

  return emoji as Optionalize<typeof emoji>;
}

export interface Emoji extends ReturnType<typeof transformEmoji> {}
