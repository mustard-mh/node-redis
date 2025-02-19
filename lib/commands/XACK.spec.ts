import { strict as assert } from 'assert';
import { TestRedisServers, itWithClient } from '../test-utils';
import { transformArguments } from './XACK';

describe('XACK', () => {
    describe('transformArguments', () => {
        it('string', () => {
            assert.deepEqual(
                transformArguments('key', 'group', '1-0'),
                ['XACK', 'key', 'group', '1-0']
            );
        });

        it('array', () => {
            assert.deepEqual(
                transformArguments('key', 'group', ['1-0', '2-0']),
                ['XACK', 'key', 'group', '1-0', '2-0']
            );
        });
    });

    itWithClient(TestRedisServers.OPEN, 'client.xAck', async client => {
        assert.equal(
            await client.xAck('key', 'group', '1-0'),
            0
        );
    });
});
