const proxy = require('koa-proxies');

module.exports = {
  port: 9000,
  middlewares: [
    proxy('/api', {
      target: 'http://www.martinetherton.com:3000',
      rewrite: path => path.replace(/\/api\/contacting\//, '/api/contacting-proxy/'),
      events: {
        proxyReq(proxyReq, req, res) {
          console.log('in proxy req');
          console.log(req.oldPath);
        }
      }
    })
  ],
};
