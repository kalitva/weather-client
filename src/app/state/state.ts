export interface State<S> {

  update(subject: S): void;

  onChange(subscriber: (subject: S) => void): void;
}
