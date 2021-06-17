import { Channel } from "../../types/channels/channel.ts";
import { snowflakeToBigint } from "../bigint.ts";
import { createNewProp } from "../utils.ts";

export const threadToggles = {
  /** Whether this thread is archived. */
  archived: 1n,
  /** Whether this thread is locked. */
  locked: 2n,
};

const baseThread: Partial<DiscordenoThread> = {
  get archived() {
    return Boolean(this.bitfield! & threadToggles.archived);
  },
  get locked() {
    return Boolean(this.bitfield! & threadToggles.locked);
  },
  toJSON() {
    return {
      id: this.id?.toString(),
      channelId: this.channelId?.toString(),
      memberCount: this.memberCount,
      messageCount: this.messageCount,
      archiveTimestamp: new Date(this.archiveTimestamp!).toISOString(),
      archiverId: this.archiverId?.toString(),
      autoArchiveDuration: this.autoArchiveDuration,
      archived: this.archived,
      locked: this.locked,
    } as Thread;
  },
};

export function channelToThread(channel: Channel) {
  let bitfield = 0n;

  if (channel.threadMetadata?.archived) bitfield |= threadToggles.archived;
  if (channel.threadMetadata?.locked) bitfield |= threadToggles.locked;

  return Object.create(baseThread, {
    id: createNewProp(snowflakeToBigint(channel.id)),
    channelId: createNewProp(snowflakeToBigint(channel.parentId!)),
    memberCount: createNewProp(channel.memberCount),
    messageCount: createNewProp(channel.messageCount),
    archiveTimestamp: createNewProp(
      channel.threadMetadata?.archiveTimestamp ? Date.parse(channel.threadMetadata.archiveTimestamp) : undefined
    ),
    archiverId: createNewProp(
      channel.threadMetadata?.archiverId ? snowflakeToBigint(channel.threadMetadata.archiverId) : undefined
    ),
    autoArchiveDuration: createNewProp(channel.threadMetadata?.autoArchiveDuration || 0),
    bitfield: createNewProp(bitfield),
  });
}

export interface Thread {
  id: string;
  channelId: string;
  memberCount: number;
  messageCount: number;
  archiveTimestamp: string;
  archiverId?: string;
  autoArchiveDuration: number;
  archived: boolean;
  locked: boolean;
}

export interface DiscordenoThread {
  id: bigint;
  channelId: bigint;
  memberCount: number;
  messageCount: number;
  archiveTimestamp: number;
  archiverId?: bigint;
  autoArchiveDuration: number;
  archived: boolean;
  locked: boolean;
  bitfield: bigint;
  toJSON(): Thread;
}