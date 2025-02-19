import { strict as assert } from 'assert';
import { TestRedisServers, itWithClient } from '../test-utils';
import { transformArguments } from './MEMORY_DOCTOR';

describe('MEMORY DOCTOR', () => {
    it('transformArguments', () => {
        assert.deepEqual(
            transformArguments(),
            ['MEMORY', 'DOCTOR']
        );
    });

    itWithClient(TestRedisServers.OPEN, 'client.memoryDoctor', async client => {
        assert.equal(
            typeof (await client.memoryDoctor()),
            'string'
        );
    });
});
