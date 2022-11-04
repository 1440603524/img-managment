type Obj<T = any> = {
  [K in Keys]: T;
};

declare interface Window {
  sensors: any;
  zc: Function;
}

