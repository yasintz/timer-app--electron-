function makeid(length = 13) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

  let i = 0;
  while (i++ < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export default makeid;
