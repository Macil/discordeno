import { SnakeCasedProperties } from "../util.ts";

export interface UpdateOthersVoiceState {
  /** The id of the channel the user is currently in */
  channelId: string;
  /** Toggles the user's suppress state */
  suppress?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#update-user-voice-state */
export type DiscordUpdateOthersVoiceState = SnakeCasedProperties<
  UpdateOthersVoiceState
>;
