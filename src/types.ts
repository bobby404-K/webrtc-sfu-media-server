export interface MediaProducer {
  id: string;
  peerId: string;
  kind: 'audio' | 'video';
  ssrc: number;
  bitrateKbps: number;
}

export interface MediaConsumer {
  id: string;
  peerId: string;
  producerId: string;
  paused: boolean;
}
