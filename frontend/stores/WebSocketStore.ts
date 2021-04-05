import {
  action,
  autorun,
  comparer,
  computed,
  makeObservable,
  observable,
  runInAction,
  toJS,
} from 'mobx';
import RootStore from './RootStore';
import { io, Socket } from 'socket.io-client';

export class WebSocketStore {
  private rootStore: RootStore;

  @observable.deep
  socket?: Socket;

  @observable
  url: string;

  @observable
  isConnected: boolean;

  @observable
  messages: any[];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.socket = null;
    this.isConnected = false;
    const urlObject = new URL(process.env.NEXT_PUBLIC_API_ENDPOINT);
    this.url = `ws://${urlObject.host}`;
    this.messages = [];
    makeObservable(this);
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  @action
  init(): void {
    this.socket = io(this.url);
    this.socket.on('connect', () => {
      this.setConnected(true);
    });
    this.socket.on('disconnect', () => {
      this.setConnected(false);
    });
    this.registerListeners();
  }

  @action
  private setConnected(connected: boolean): void {
    this.isConnected = connected;
  }

  @action
  connect(): void {
    this.socket?.connect();
  }

  @action
  registerListeners(): void {
    // Chat
    this.socket.on('recieve_message', (payload) => {
      console.log(payload);
      this.addMessage(payload);
    });
  }

  @action
  addMessage(message: any): void {
    this.messages.push(message);
  }

  @action
  close(): void {
    this.socket.disconnect();
  }
}
