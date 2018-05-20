// user_account
const bcrypt = require('bcrypt');
const sha256 = require('sha256');
const schema = require('async-validator');
const db = require('../assets/dbaction');
const checkToken = require('../assets/tokencheck');
const saltRounds = 10;

// 登陆
exports.login = async (req, res) => {
  const { account, password } = req.body;
  const descriptor = {
    query: {
      type: "object", required: true,
      fields: {
        account: {type: "string", required: true},
        password: {type: "string", required: true}
      }
    }
  }
  let validator = new schema(descriptor);
  validator.validate({query: req.body}, async (errors, fields) => {
    if(errors) {
      res.send({
        code: 200000,
        msg: '参数格式不正确'
      });
      return;
    }
    if (!account || !password) {
      res.send({
        code: 200000,
        msg: '参数为空'
      });
      return;
    }
    let opt = {
      type: 'find',
      table: 'users',
      query: {
        account: account
      }
    };
    let usersData = await db(opt);
    if (usersData.length === 0) {
      res.send({
        code: 200001,
        msg: '用户不存在'
      });
      return;
    }
    let userInfo = usersData[0];
    let hash = userInfo.password;
    let result = await bcrypt.compare(password, hash).catch(err => {
      res.send({
        code: 200002,
        msg: '密码错误'
      });
      return;
    });
    if (result) {
      let time = new Date().getTime();
      let token = sha256(sha256(toString(userInfo._id)) + time);
      let tokenUpdate = {
        type: 'updateOne',
        table: 'users',
        query: {
          account: account
        },
        data: {
          $set: {
            token: token
          }
        }
      };
      db(tokenUpdate);
      res.send({
        code: 100000,
        uid: userInfo._id,
        token: token,
        account: userInfo.account,
        myContent: userInfo.content,
        recentView: userInfo.recent_view
      });
      return;
    } else {
      res.send({
        code: 200002,
        msg: '密码错误'
      });
      return;
    }
  });
};

// 注册
exports.register = async (req, res) => {
  const { account, password, inviteCode } = req.body;
  const descriptor = {
    query: {
      type: "object", required: true,
      fields: {
        account: {type: "string", required: true},
        password: {type: "string", required: true},
        inviteCode: {type: "string", required: true}
      }
    }
  }
  let validator = new schema(descriptor);
  validator.validate({query: req.body}, async (errors, fields) => {
    if(errors) {
      res.send({
        code: 200000,
        msg: '参数格式不正确'
      });
      return;
    }
    if (!account || !password || !inviteCode) {
      res.send({
        code: 200000,
        msg: '参数为空'
      });
      return;
    }
    let codeOpt = {
      type: 'find',
      table: 'invitations',
      query: {
        code: inviteCode
      }
    };
    if (escape(password).indexOf('%u') > 0) {
      res.send({
        code: 200004,
        msg: '密码不能有非英文以及特殊符号字符噢'
      });
      return;
    }
    if (account.length > 20) {
      res.send({
        code: 200005,
        msg: '账号长度错误'
      });
      return;
    }
    if (password.length > 18 || password.length < 6) {
      res.send({
        code: 200006,
        msg: '密码长度错误'
      });
      return;
    }
    let checkCode = await db(codeOpt);
    if (checkCode.length === 0) {
      res.send({
        code: 200007,
        msg: '邀请码不存在'
      });
      return;
    } else if (!checkCode[0].available) {
      res.send({
        code: 200008,
        msg: '邀请码已被使用'
      });
      return;
    }
    bcrypt
      .hash(password, saltRounds)
      .then(async result => {
        let opt = {
          type: 'insertOne',
          table: 'users',
          query: {
            account: account,
            password: result,
            content: [],
            recent_view: {}
          }
        };
        let usersData = await db(opt);
        if (
          usersData.errmsg !== undefined &&
          usersData.errmsg.split('"')[1] === account
        ) {
          res.send({
            code: 200009,
            msg: '账号已经被用过啦'
          });
          return;
        }
        codeOpt.type = 'updateOne';
        codeOpt.data = {
          $set: {
            available: false
          }
        };
        let invate_code_use = await db(codeOpt);
        let userInfo = usersData.ops[0];
        let time = new Date().getTime();
        let token = sha256(sha256(toString(userInfo._id)) + time);
        let tokenUpdate = {
          type: 'updateOne',
          table: 'users',
          query: {
            account: account
          },
          data: {
            $set: {
              token: token
            }
          }
        };
        db(tokenUpdate);
        res.send({
          code: 100000,
          uid: userInfo._id,
          token: token,
          account: account,
          myContent: userInfo.content,
          recentView: userInfo.recent_view
        });
      })
      .catch(error => {
        res.send({
          code: 400000,
          msg: error
        });
      });
  });
};

// 用户数量
exports.number = async (req, res) => {
  const opt = {
    type: "find",
    table: "users",
    query: {}
  };
  let usersNumber = db(opt);
  res.send({
    code: 100000,
    usersNumber: usersNumber.length
  });
}

// 用户信息
exports.info = async (req, res) => {
  const token = req.header('Authorization');
  const user = await checkToken(token);
  res.send({
    code: 100000,
    account: user[0].account,
    myContent: user[0].content,
    recentView: user[0].recent_view
  });
}