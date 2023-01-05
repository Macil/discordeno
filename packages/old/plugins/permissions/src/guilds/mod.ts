import type { BotWithCache } from '../../deps.js'
import { automod } from './automod/index.js.js'
import { createGuild } from './createGuild.js'
import { deleteGuild } from './deleteGuild.js'
import { editGuild } from './editGuild.js'
import { editGuildMfaLevel } from './editGuildMfaLevel.js'
import { editWelcomeScreen } from './editWelcomeScreen.js'
import { events } from './events/index.js.js'
import { getAuditLog } from './getAuditLog.js'
import { getBan } from './getBan.js'
import { getBans } from './getBans.js'
import { getPruneCount } from './getPruneCount.js'
import { getVanityUrl } from './getVanityUrl.js'
import { getWelcomeScreen } from './getWelcomeScreen.js'
import { voice } from './voice/index.js.js'
import { widgets } from './widgets/index.js.js'

export function guilds (bot: BotWithCache) {
  automod(bot)
  events(bot)
  voice(bot)
  widgets(bot)

  createGuild(bot)
  deleteGuild(bot)
  editGuild(bot)
  editGuildMfaLevel(bot)
  editWelcomeScreen(bot)
  getAuditLog(bot)
  getBan(bot)
  getBans(bot)
  getPruneCount(bot)
  getVanityUrl(bot)
  getWelcomeScreen(bot)
}
