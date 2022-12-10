import type { RestManager } from '../../restManager.js'
import type { BigString } from '@discordeno/types'

/**
 * Deletes a template from a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to delete the template from.
 * @param templateCode - The code of the template to delete.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires a _Guild Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#delete-guild-template}
 */
export async function deleteGuildTemplate (
  rest: RestManager,
  guildId: BigString,
  templateCode: string
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.GUILD_TEMPLATE(guildId, templateCode)
  )
}