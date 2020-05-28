import { Route } from '.';

const writeFile: Route<{ content: string }, { path: string }> = (req, res) => {
  if (req.payload.content === '1') {
    throw new Error('hata oldu');
  }

  res({ path: 'yasin' });
};

export default {
  writeFile,
};
