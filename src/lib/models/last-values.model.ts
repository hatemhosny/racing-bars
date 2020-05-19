interface Value {
  date: string;
  value: number;
}

export interface LastValues {
  [key: string]: Value;
}
