import {
  InteractionResponseTypes,
  InteractionTypes,
  type BigString,
  type ChannelTypes,
  type DiscordInteraction,
  type DiscordInteractionDataOption,
  type InteractionCallbackData,
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { Bot, DiscordChannel, Interaction, InteractionDataOption, InteractionDataResolved, Member, Message } from '../index.js'
import type { DiscordInteractionDataResolved } from '../typings.js'

const baseInteraction: Partial<Interaction> = {
  async respond(response, options) {
    let type = InteractionResponseTypes.ChannelMessageWithSource

    // If user provides a string, change it to a response object
    if (typeof response === 'string') response = { content: response }
    // If user provides an object, determine if it should be an autocomplete or a modal response
    else if (response.title) type = InteractionResponseTypes.Modal
    else if (this.type === InteractionTypes.ApplicationCommandAutocomplete) type = InteractionResponseTypes.ApplicationCommandAutocompleteResult

    // If user wants to send a private message
    if (type === InteractionResponseTypes.ChannelMessageWithSource && options?.isPrivate) response.flags = 64

    // Since this has already been given a response, any further responses must be followups.
    if (this.acknowledged) return await this.bot!.helpers.sendFollowupMessage(this.token!, response)

    // Modals cannot be chained
    if (this.type === InteractionTypes.ModalSubmit && type === InteractionResponseTypes.Modal)
      throw new Error('Cannot respond to a modal interaction with another modal.')

    // Autocomplete response can only be used for autocomplete interactions
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete && type !== InteractionResponseTypes.ApplicationCommandAutocompleteResult)
      throw new Error('Cannot respond to an autocomplete interaction with a modal or message.')

    // If user has not already responded to this interaction we need to send an original response
    this.acknowledged = true
    return await this.bot!.helpers.sendInteractionResponse(this.id!, this.token!, { type, data: response })
  },

  async edit(response) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot edit an autocomplete interaction')

    // If user provides a string, change it to a response object
    if (typeof response === 'string') response = { content: response }

    return await this.bot!.helpers.editOriginalInteractionResponse(this.token!, response)
  },

  async defer(isPrivate) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot defer an autocomplete interaction')
    if (this.acknowledged) throw new Error('Cannot defer an already responded interaction')

    // Determine the type of defer response
    const type =
      this.type === InteractionTypes.MessageComponent
        ? InteractionResponseTypes.DeferredUpdateMessage
        : InteractionResponseTypes.DeferredChannelMessageWithSource

    // If user wants to send a private message
    const data: InteractionCallbackData = {}
    if (isPrivate) data.flags = 64

    this.acknowledged = true
    return await this.bot!.helpers.sendInteractionResponse(this.id!, this.token!, { type, data })
  },

  async delete(messageId?: BigString) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot delete an autocomplete interaction')

    if (messageId) return await this.bot?.helpers.deleteFollowupMessage(this.token!, messageId)
    else return await this.bot?.helpers.deleteOriginalInteractionResponse(this.token!)
  },
}

export function transformInteraction(bot: Bot, payload: DiscordInteraction): Interaction {
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined
  const user = bot.transformers.user(bot, payload.member?.user ?? payload.user!)

  const interaction: Interaction = Object.create(baseInteraction)
  const props = bot.transformers.desiredProperties.interaction
  interaction.bot = bot
  interaction.acknowledged = false

  if (props.id && payload.id) interaction.id = bot.transformers.snowflake(payload.id)
  if (props.applicationId && payload.application_id) interaction.applicationId = bot.transformers.snowflake(payload.application_id)
  if (props.type && payload.type) interaction.type = payload.type
  if (props.token && payload.token) interaction.token = payload.token
  if (props.version && payload.version) interaction.version = payload.version
  if (props.locale && payload.locale) interaction.locale = payload.locale
  if (props.guildLocale && payload.guild_locale) interaction.guildLocale = payload.guild_locale
  if (props.guildId && guildId) interaction.guildId = guildId
  if (props.user && user) interaction.user = user
  if (props.appPermissions && payload.app_permissions) interaction.appPermissions = bot.transformers.snowflake(payload.app_permissions)
  if (props.message && payload.message) interaction.message = bot.transformers.message(bot, payload.message)
  if (props.channel && payload.channel) interaction.channel = bot.transformers.channel(bot, { channel: payload.channel as DiscordChannel, guildId })
  if (props.channelId && payload.channel_id) interaction.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props.member && guildId && payload.member) interaction.member = bot.transformers.member(bot, payload.member, guildId, user.id)
  if (props.data && payload.data) {
    interaction.data = {
      type: payload.data.type,
      componentType: payload.data.component_type,
      customId: payload.data.custom_id,
      components: payload.data.components?.map((component) => bot.transformers.component(bot, component)),
      values: payload.data.values,
      id: payload.data.id ? bot.transformers.snowflake(payload.data.id) : undefined,
      name: payload.data.name,
      resolved: payload.data.resolved ? transformInteractionDataResolved(bot, payload.data.resolved, guildId) : undefined,
      options: payload.data.options?.map((opt) => bot.transformers.interactionDataOptions(bot, opt)),
      targetId: payload.data.target_id ? bot.transformers.snowflake(payload.data.target_id) : undefined,
      // guildId: payload.data.guild_id ? bot.transformers.snowflake(payload.data.guild_id) : undefined,
    }
  }

  return bot.transformers.customizers.interaction(bot, payload, interaction)
}

export function transformInteractionDataOption(bot: Bot, option: DiscordInteractionDataOption): InteractionDataOption {
  const opt = {
    name: option.name,
    type: option.type,
    value: option.value,
    options: option.options,
    focused: option.focused,
  } as InteractionDataOption

  return bot.transformers.customizers.interactionDataOptions(bot, option, opt)
}

export function transformInteractionDataResolved(bot: Bot, resolved: DiscordInteractionDataResolved, guildId?: bigint): InteractionDataResolved {
  const transformed: InteractionDataResolved = {}

  if (resolved.messages) {
    transformed.messages = new Collection(
      Object.entries(resolved.messages).map(([id, value]) => {
        const message: Message = bot.transformers.message(bot, value)
        return [message.id, message]
      }),
    )
  }

  if (resolved.users) {
    transformed.users = new Collection(
      Object.entries(resolved.users).map(([id, value]) => {
        const user = bot.transformers.user(bot, value)
        return [user.id, user]
      }),
    )
  }

  if (guildId && resolved.members) {
    transformed.members = new Collection(
      Object.entries(resolved.members).map(([id, value]) => {
        const member: Member = bot.transformers.member(bot, value, guildId, bot.transformers.snowflake(id))
        return [member.id, member]
      }),
    )
  }

  if (guildId && resolved.roles) {
    transformed.roles = new Collection(
      Object.entries(resolved.roles).map(([id, value]) => {
        const role = bot.transformers.role(bot, { role: value, guildId })
        return [role.id, role]
      }),
    )
  }

  if (resolved.channels) {
    transformed.channels = new Collection(
      Object.entries(resolved.channels).map(([key, value]) => {
        const id = bot.transformers.snowflake(key)
        const channel = value as {
          id: string
          name: string
          type: ChannelTypes
          permissions: string
        }
        return [
          id,
          {
            id,
            name: channel.name,
            type: channel.type,
            permissions: bot.transformers.snowflake(channel.permissions),
          },
        ]
      }),
    )
  }

  if (resolved.attachments) {
    transformed.attachments = new Collection(
      Object.entries(resolved.attachments).map(([key, value]) => {
        const id = bot.transformers.snowflake(key)
        return [id, bot.transformers.attachment(bot, value)]
      }),
    )
  }

  return transformed
}
