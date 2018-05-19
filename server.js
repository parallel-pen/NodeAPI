const express = require('express');
const db = require('./assets/dbaction');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '1mb' })); //body-parser 解析json格式数据
app.use(
  bodyParser.urlencoded({
    //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
  })
);

const user = require('./routes/user');
const node = require('./routes/node');

// all
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, OPTIONS, PATCH'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// 账户操作
app.post('/login', user.login);
app.post('/register', user.register);
app.get('/users', user.number);

// 内容操作
app.get('/node/list', node.list);
app.get('/node/content', node.content);
app.post('/node/create', node.create);

app.listen(8888, function() {
  console.log('App listening on 8888');
});
