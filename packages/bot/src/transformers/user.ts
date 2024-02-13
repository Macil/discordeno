import type { DiscordUser } from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import { ToggleBitfield, UserToggles, type Bot, type User } from '../index.js'

const baseUser: Partial<User> = {
  get tag() {
    return `${this.username}#${this.discriminator}`
  },
  get bot() {
    return !!this.toggles?.has('bot')
  },
  get system() {
    return !!this.toggles?.has('system')
  },
  get mfaEnabled() {
    return !!this.toggles?.has('mfaEnabled')
  },
  get verified() {
    return !!this.toggles?.has('verified')
  },
}

export function transformUser(bot: Bot, payload: DiscordUser): User {
  const user: User = Object.create(baseUser)
  const props = bot.transformers.desiredProperties.user

  if (props.bot || props.system || props.mfaEnabled || props.verified) {
    user.toggles = new UserToggles(payload)
  }
  if (props.flags) user.flags = new ToggleBitfield(payload.flags)
  if (props.publicFlags) user.publicFlags = new ToggleBitfield(payload.public_flags)
  if (props.id && payload.id) user.id = bot.transformers.snowflake(payload.id)
  if (props.username && payload.username) user.username = payload.username
  if (props.globalName && payload.global_name) user.globalName = payload.global_name
  if (props.discriminator && payload.discriminator) user.discriminator = payload.discriminator
  if (props.locale && payload.locale) user.locale = payload.locale
  if (props.email && payload.email) user.email = payload.email
  if (props.premiumType && payload.premium_type) user.premiumType = payload.premium_type
  if (props.avatar && payload.avatar) user.avatar = iconHashToBigInt(payload.avatar)
  if (props.banner && payload.banner) user.banner = iconHashToBigInt(payload.banner)
  if (props.avatarDecoration && payload.avatar_decoration) user.avatarDecoration = iconHashToBigInt(payload.avatar_decoration)
  if (props.accentColor && payload.accent_color) user.accentColor = payload.accent_color

  return bot.transformers.customizers.user(bot, payload, user)
}
