let express = require('express');
let db = require('./assets/dbaction');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

let user = require('./routes/user');

// all
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");  
    res.header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// 账户操作
app.post('/api/login', user.index);
app.post('/api/resigter', user.create);


app.listen(8888, function() {
    console.log('App listening on 8888');
});