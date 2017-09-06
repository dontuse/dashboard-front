/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const messages = require('./mock/seller/messages1.json');
const order = require('./mock/seller/order760.json');
const fs = require('fs');
const cookies = require('./cookies');
const request = require('request').defaults({
  headers: {
    Cookie: cookies,
  }});

const mockData = false;
const messageTemplates = require('./mock/seller/messageTemplates');

console.log('dsadsd',cookies);

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // // intercept OPTIONS method
  // if ('OPTIONS' == req.method) {
  //   res.send(200);
  // }
  // else {
  //   next();
  // }
  next();
};


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
// app.use(allowCrossDomain);

if (mockData) {
  app.get('/api/seller/orders/:id/messages', (req, res) => {
    res.json(messages);
  });

  app.get('/api/seller/orders/:id', (req, res) => {
    res.json(order);
  });

  app.get('/api/customer/orders/:id', (req, res) => {
    const contents = fs.readFileSync('./mock/seller/order1.json', 'utf8');
    // console.log(contents);
    res.send(contents);
  });

  app.get('/api/v1/seller/orders', (req, res) => {
    const contents = fs.readFileSync('./mock/seller/orders.json', 'utf8');
    // console.log(contents);
    res.send(contents);
  });
}

app.post('/fake/seller/orders/message_templates', (req, res) => {
  console.log('---------------------------');
  setTimeout(() => {
    res.json({
      id: Math.random(),
      text: 'yyyyyyyy',
      name: 'aaaaaaaaaa',
    });
  }, 500);
  // res.end();
});

app.put('/fake/seller/orders/message_templates/:id', (req, res) => {
  console.log('---------------------------', req.body);

  setTimeout(() => {
    res.json(messageTemplates[1]);
  }, 500);
  // res.end();
});

app.get('/fake/seller/orders/message_templates', (req, res) => {
  setTimeout(() => {
    res.json(messageTemplates);
  }, 500);
  // res.end();
});

app.delete('/fake/seller/orders/message_templates/:id', (req, res) => {
  setTimeout(() => {
    res.json(messageTemplates);
  }, 500);
  // res.end();
});


// app.all('/fakeAi/*', (req, res) => {
//   const contents = fs.readFileSync('./mock/seller/orders.json', 'utf8');
//   // console.log(contents);
//   res.send(contents);
// });

app.all('/api/*', (req, res) => {
  const url = `http://www.test.knife.railsc.ru/${req.url}`;
  // console.log('url', url);
  req.pipe(request(url)).pipe(res);
  // console.log(res);
});

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: '/app',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(`${__dirname}/dist`));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
