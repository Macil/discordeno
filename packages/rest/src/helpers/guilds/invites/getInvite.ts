import { routes } from '@discordeno/constant'
import type { BigString, DiscordInviteMetadata, GetInvite } from '@discordeno/types'
import { TargetTypes } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { User } from '../../../transformers/member.js'
import type { ScheduledEvent } from '../../../transformers/scheduledEvent.js'

export interface BaseInvite {
  code: string
  guildId?: BigString
  channelId?: BigString
  inviter?: User
  targetType?: TargetTypes
  targetUser?: User
  targetApplicationId?: BigString
  approximatePresenceCount?: number
  approximateMemberCount?: number
  expiresAt?: number
  guildScheduledEvent?: ScheduledEvent
}

export type InviteMetadata = BaseInvite & {
  uses: number
  maxUses: number
  maxAge: number
  temporary: boolean
  createdAt: number
}

/**
 * Gets an invite to a channel by its invite code.
 *
 * @param rest - The rest manager to use to make the request.
 * @param inviteCode - The invite code of the invite to get.
 * @param options - The parameters for the fetching of the invite.
 * @returns An instance of {@link BaseInvite | Invite}.
 *
 * @see {@link https://discord.com/developers/docs/resources/invite#get-invite}
 */
export async function getInvite (
  rest: RestManager,
  inviteCode: string,
  options?: GetInvite
): Promise<BaseInvite> {
  const result = await rest.runMethod<DiscordInviteMetadata>(
    rest,
    'GET',
    routes.INVITE(inviteCode, options)
  )

  return {
    code: result.code,
    guildId: result.guild?.id
      ? rest.transformers.snowflake(result.guild.id)
      : undefined,
    channelId: result.channel?.id
      ? rest.transformers.snowflake(result.channel.id)
      : undefined,
    inviter: result.inviter
      ? rest.transformers.user(rest, result.inviter)
      : undefined,
    targetType: result.target_type
      ? result.target_type === 1
        ? TargetTypes.Stream
        : TargetTypes.EmbeddedApplication
      : undefined,
    targetUser: result.target_user
      ? rest.transformers.user(rest, result.target_user)
      : undefined,
    targetApplicationId: result.target_application?.id
      ? rest.transformers.snowflake(result.target_application.id)
      : undefined,
    approximatePresenceCount: result.approximate_presence_count,
    approximateMemberCount: result.approximate_member_count,
    expiresAt: result.expires_at ? Date.parse(result.expires_at) : undefined
  }
}
