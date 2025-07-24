import assert from 'node:assert';
import test from 'node:test';
import { SfuRoom } from '../dist/sfu.js';

test('SfuRoom connects producers to subscribers and calculates routed bandwidth', () => {
  const room = new SfuRoom('engineering-standup');
  room.addProducer({ id: 'cam_alice', peerId: 'alice', kind: 'video', ssrc: 998877, bitrateKbps: 2500 });

  room.subscribe('bob', 'cam_alice');
  room.subscribe('charlie', 'cam_alice');

  const forwardedBytes = room.routeRtpPacket('cam_alice', 1200);
  assert.strictEqual(forwardedBytes, 2400); // 2 consumers * 1200 bytes
});
