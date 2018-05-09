// user_account

let bcrypt = require('bcrypt');
let md5 = require('md5');
let db = require('../assets/dbaction');
const saltRounds = 10;

exports.index = async (req, res) => {
    let account = req.body.account;
    let password = req.body.password;
    let opt = {
        type: "find",
        table: "users",
        query: {
            account: account
        }
    };
    let usersData = await db(opt);
    if (usersData.length === 0) {
        res.send({
            code: 200000,
            msg: '用户不存在'
        });
    }
    let userInfo = usersData[0];
    let hash = userInfo.password;
    bcrypt.compare(password, hash).then((result) => {
        if (result) {
            let time = new Date().getTime();
            let token = md5(md5(userInfo._id) + time);
            res.send({
                code: 100000,
                uid: userInfo._id,
                token: token,
                username: userInfo.username,
                my_content: userInfo.content
            });
        } else {
            res.send({
                code: 200000,
                msg: '密码错误'
            });
        }
    });
};

exports.create = (req, res) => {
    let account = req.body.account;
    let username = req.body.username;
    let password = req.body.password;
    console.log(escape(account));
    if (escape(account).indexOf("%u") > 0) {
        res.send({
            code: 200000,
            msg: "账号不能有非英文以及符号字符噢"
        });
        return;
    }
    bcrypt.hash(password, saltRounds).then(async (result) => {
        let opt = {
            type: "insertOne",
            table: "users",
            query: {
                username: username,
                account: account,
                password: result,
                content: []
            }
        };
        let usersData = await db(opt);
        if (usersData.errmsg !== undefined && usersData.errmsg.split('\"')[1] === account) {
            res.send({
                code: 200000,
                msg: "账号已经被用过啦"
            });
            return;
        } else if (usersData.errmsg !== undefined && usersData.errmsg.split('\"')[1] === username) {
            res.send({
                code: 200000,
                msg: "用户名已经被用过啦"
            });
            return;
        }
        let userInfo = usersData.ops[0];
        let time = new Date().getTime();
        let token = md5(md5(userInfo._id) + time);
        res.send({
            code: 100000,
            uid: userInfo._id,
            token: token,
            username: userInfo.username,
            my_content: userInfo.content
        });
    }).catch((error) => {
        console.log(error);
    });
};