import { ipcMain } from 'electron';
import api from '../lib/api';

function createApiListeners() {
  Object.entries(api).forEach(([key, fn]) => {
    ipcMain.on(
      key,
      async (event: any, arg: { payload: any; fetchId: string }) => {
        try {
          let response: any = null;
          const req = { payload: arg.payload };
          await fn(req, (r) => {
            response = r;
          });
          event.sender.send(key, {
            fetchId: arg.fetchId,
            data: response,
            error: undefined,
          });
        } catch (error) {
          event.sender.send(key, { fetchId: arg.fetchId, data: null, error });
        }
      }
    );
  });
}

export default createApiListeners;
