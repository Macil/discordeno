import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Pins a message in a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel where the message is to be pinned.
 * @param messageId - The ID of the message to pin.
 *
 * @remarks
 * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
 *
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * ⚠️ There can only be at max 50 messages pinned in a channel.
 *
 * Fires a _Channel Pins Update_ event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#pin-message}
 */
export async function pinMessage (
  rest: RestManager,
  channelId: BigString,
  messageId: BigString,
  reason?: string
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'PUT',
    routes.CHANNEL_PIN(channelId, messageId),
    reason ? { reason } : undefined
  )
}
