require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

export default (domain: string) => (path: string, data: any) => fetch(
  urlJoin(domain, uniqePath(path)), formdata(data)
).then((res: Response) => {
  if (res.ok) return res.json();
  throw res.statusText;
});

function formdata(data: any) {
  const options: any = {
    credentials: 'include',
    method: 'GET',
    mode: 'cors'
  };

  if (data) {
    options.method = 'POST';
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json'
    };
  }
  return options;
}

function uniqePath(path: string) {
  if (path.indexOf('?') >= 0) return path + `&timestamp=${Date.now()}`;
  return path + `?timestamp=${Date.now()}`;
}

function urlJoin(base: string, path: string) {
  switch ([base.slice(-1), path.slice(0, 1)].filter(c => c === '/').length) {
    case 2:
      return base + path.slice(1);
    case 1:
      return base + path;
    default:
      return base + '/' + path;
  }
}