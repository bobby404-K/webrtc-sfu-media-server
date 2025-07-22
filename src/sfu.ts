import { MediaConsumer, MediaProducer } from './types.js';

export class SfuRoom {
  private producers = new Map<string, MediaProducer>();
  private consumers = new Map<string, MediaConsumer[]>(); // producerId -> consumers

  constructor(public roomId: string) {}

  addProducer(producer: MediaProducer): void {
    this.producers.set(producer.id, producer);
    this.consumers.set(producer.id, []);
  }

  subscribe(peerId: string, producerId: string): MediaConsumer {
    const producer = this.producers.get(producerId);
    if (!producer) throw new Error(`Producer ${producerId} not found`);

    const consumer: MediaConsumer = {
      id: `cons_${peerId}_${producerId}`,
      peerId,
      producerId,
      paused: false
    };

    const list = this.consumers.get(producerId)!;
    list.push(consumer);
    return consumer;
  }

  routeRtpPacket(producerId: string, packetSize: number): number {
    const list = this.consumers.get(producerId) || [];
    const active = list.filter(c => !c.paused);
    return active.length * packetSize; // Forwarded byte volume
  }
}
