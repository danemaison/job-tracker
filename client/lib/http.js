const api = {
  post(url, body) {
    return this.send('POST', url, body);
  },
  get(url) {
    return this.send('GET', url);
  },
  delete(url) {
    return this.send('DELETE', url);
  },
  put(url, body) {
    return this.send('PUT', url, body);
  },
  send(method, url, body) {
    const req = {
      method
    };
    if (body) {
      req.body = JSON.stringify(body);
      req.headers = { 'Content-Type': 'application/json' };
    }
    return fetch(url, req).then(res => {
      if (method === 'DELETE') return;
      return res.json();
    });
  }
};

export default api;
