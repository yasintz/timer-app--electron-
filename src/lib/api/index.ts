import api from './main';

export type Route<P, R> = (
  req: { payload: P },
  res: (r: R) => void
) => Promise<void> | void;

export type ApiType = typeof api;

export type ApiRouteKeys = keyof ApiType;

export default api;
