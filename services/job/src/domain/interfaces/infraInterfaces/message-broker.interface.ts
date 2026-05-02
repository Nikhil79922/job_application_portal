export interface IMessageBroker {
  publish<T>(topic: string, message: T, key?: string): Promise<void>;
}