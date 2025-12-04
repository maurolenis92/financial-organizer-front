export interface OptionsHttpModel<T> {
  headers?: { [header: string]: string | string[] };
  params?: { [param: string]: string | string[] };
  body?: T;
  withCredentials?: boolean;
  handleError?: () => void;
}
