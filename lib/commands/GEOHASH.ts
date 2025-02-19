import { RedisCommandArguments } from '.';
import { pushVerdictArguments } from './generic-transformers';

export const FIRST_KEY_INDEX = 1;

export const IS_READ_ONLY = true;

export function transformArguments(key: string, member: string | Array<string>): RedisCommandArguments {
    return pushVerdictArguments(['GEOHASH', key], member);
}

export declare function transformReply(): Array<string>;
