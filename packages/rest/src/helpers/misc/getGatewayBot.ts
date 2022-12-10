import type { DiscordGetGatewayBot, GetGatewayBot } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
export async function getGatewayBot (rest: RestManager): Promise<GetGatewayBot> {
  const result = await rest.runMethod<DiscordGetGatewayBot>(
    rest,
    'GET',
    rest.constants.routes.GATEWAY_BOT()
  )

  return rest.transformers.gatewayBot(result)
}