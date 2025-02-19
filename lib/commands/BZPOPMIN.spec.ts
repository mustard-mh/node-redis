import { strict as assert } from 'assert';
import { TestRedisServers, itWithClient } from '../test-utils';
import { transformArguments, transformReply } from './BZPOPMIN';
import { commandOptions } from '../../index';

describe('BZPOPMIN', () => {
    describe('transformArguments', () => {
        it('single', () => {
            assert.deepEqual(
                transformArguments('key', 0),
                ['BZPOPMIN', 'key', '0']
            );
        });

        it('multiple', () => {
            assert.deepEqual(
                transformArguments(['1', '2'], 0),
                ['BZPOPMIN', '1', '2', '0']
            );
        });
    });

    describe('transformReply', () => {
        it('null', () => {
            assert.equal(
                transformReply(null),
                null
            );
        });

        it('member', () => {
            assert.deepEqual(
                transformReply(['key', 'value', '1']),
                {
                    key: 'key',
                    value: 'value',
                    score: 1
                }
            );
        });
    });

    itWithClient(TestRedisServers.OPEN, 'client.bzPopMin', async client => {
        const [ bzPopMinReply ] = await Promise.all([
            client.bzPopMin(
                commandOptions({ isolated: true }),
                'key',
                0
            ),
            client.zAdd('key', [{
                value: '1',
                score: 1
            }])
        ]);

        assert.deepEqual(
            bzPopMinReply,
            {
                key: 'key',
                value: '1',
                score: 1
            }
        );
    });
});
