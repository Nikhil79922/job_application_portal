export interface IMessageBroker {
    publish<T>(topic: string, message: T): Promise<void>;
  }