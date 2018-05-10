// user_account
let bcrypt = require('bcrypt');
let sha256 = require('sha256');
let db = require('../assets/dbaction');
const saltRounds = 10;

// 登陆
exports.login = async (req, res) => {
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
        return;
    }
    let userInfo = usersData[0];
    let hash = userInfo.password;
    bcrypt.compare(password, hash).then((result) => {
        if (result) {
            let time = new Date().getTime();
            let token = sha256(sha256(toString(userInfo._id)) + time);
            res.send({
                code: 100000,
                uid: userInfo._id,
                token: token,
                username: userInfo.username,
                my_content: userInfo.content
            });
            return;
        } else {
            res.send({
                code: 200000,
                msg: '密码错误'
            });
            return;
        }
    });
};

// 注册
exports.resigter = async (req, res) => {
    let account = req.body.account;
    let username = req.body.username;
    let password = req.body.password;
    let invite_code = req.body.invite_code;
    let codeOpt = {
        type: 'find',
        table: 'invitations',
        query: {
            code: invite_code
        }
    };
    let checkCode = await db(codeOpt);
    if (checkCode.length === 0) {
        res.send({
            code: 200000,
            msg: '邀请码不存在'
        });
        return;
    } else if (!checkCode[0].available) {
        res.send({
            code: 200000,
            msg: '邀请码已被使用'
        });
        return;
    }
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
        codeOpt.type = "updateOne";
        codeOpt.data = {
            $set: {
                available: false
            }
        };
        let invate_code_use = await db(codeOpt);
        let userInfo = usersData.ops[0];
        let time = new Date().getTime();
        let token = sha256(sha256(toString(userInfo._id)) + time);
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