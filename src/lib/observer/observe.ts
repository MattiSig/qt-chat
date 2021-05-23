// A generic observer type, meant to be used by functionallity seeking to observe the subject
export type Observer<T> = (data: T) => void;

// Extend this class to get be able to add/remove observers and notify them of change
// T is the argument type allowed by the observer
export class Subject<T> {
  protected observers: Observer<T>[];
  constructor() {
    this.observers = [];
  }

  addObserver(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer<T>): void {
    this.observers = this.observers.filter((obs) => {
      observer !== obs;
    });
  }

  // Call the observer function for all "subscribed" observer
  notify(data: T): void {
    this.observers.forEach((observer: Observer<T>) => {
      observer(data);
    });
  }
}
