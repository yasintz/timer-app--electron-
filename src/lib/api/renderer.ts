import { ipcRenderer } from 'electron';
import { ApiRouteKeys, ApiType } from '.';
import { fnExtend } from '../../utils';
import makeid from '../../utils/make-id';

type ListenerCallback = (res: {
  data: any;
  error: any;
  fetchId: string;
}) => void;
type PayloadType<T extends ApiRouteKeys> = Parameters<ApiType[T]>[0]['payload'];
type RequestType<T extends ApiRouteKeys> = Parameters<
  Parameters<ApiType[T]>[1]
>[0];

const listeners: Record<ApiRouteKeys, Record<string, ListenerCallback>> = {
  writeFile: {},
};

Object.keys(listeners).forEach((key: ApiRouteKeys) => {
  const apiListener = listeners[key];
  ipcRenderer.on(key, (event: any, arg: any) => {
    const listener = apiListener[arg.fetchId];
    if (listener) {
      listener(arg);
    }
  });
});
function addListener(id: ApiRouteKeys, fetchId: string, fn: ListenerCallback) {
  listeners[id][fetchId] = fnExtend(fn, () => {
    delete listeners[id][fetchId];
  });
}

function fetch<T extends ApiRouteKeys>(
  id: T,
  params?: PayloadType<T>
): Promise<RequestType<T>> {
  const fetchId = makeid(9);
  return new Promise((resolve, reject) => {
    addListener(id, fetchId, ({ data, error }) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
    ipcRenderer.send(id, { payload: params, fetchId });
  });
}

export default fetch;
