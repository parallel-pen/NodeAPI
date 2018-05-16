// node
const sha256 = require('sha256');
const db = require('../assets/dbaction');
const checkToken = require('../assets/tokencheck');
const findGeniusNode = require('../assets/findgeniusnode');

exports.content = async (req, res) => {
    const token = req.header('Authorization');
    const { nodeId } = req.query;
    const user = await checkToken(token);
    if (!user) {
        res.statusCode = 401;
        res.send({
            code: 300000,
            msg: '登录信息过期'
        });
        return;
    }
    let uid = user[0]._id;
    let nodeOpt = {
        type: 'find',
        table: 'nodes',
        query: {
            [nodeId ? "_id" : 'first']: nodeId || true
        }
    };
    let nodeFind = await db(nodeOpt);
    if (nodeFind.length === 0) {
        res.send({
            code: 200012,
            msg: 'Id错误'
        });
        return;
    }
    let { _id, father_id, content, desc, author_id, child_nodes } = nodeFind[0];
    let _str = _id.toString().substr(0, 8);
    let timestamp = new Date(Number(parseInt(_str, 16).toString() + '000'));
    res.send({
        code: 100000,
        nodeId: _id,
        fatherId: father_id,
        content: content,
        desc: desc,
        timestamp: timestamp,
        authorId: uid,
        childNodes: false
    });
}

exports.list = async (req, res) => {
    const token = req.header('Authorization');
    let { nodeId } = req.query;
    const user = await checkToken(token);
    if (!user) {
        res.statusCode = 401;
        res.send({
            code: 300000,
            msg: '登录信息过期'
        });
        return;
    }
    let uid = user[0]._id;
    const geniusNode = await findGeniusNode();
    let nodeOpt = {
        type: 'find',
        table: 'nodes',
        query: {
            "father_id": nodeId || geniusNode[0]._id.toString()
        }
    };
    let childNodes = await db(nodeOpt);
    let nodeList = Array();
    childNodes.map((item, index) => {
        let node = {
            nodeId: item._id,
            desc: item.desc
        };
        nodeList.push(node);
    });
    res.send({
        code: 100000,
        nodeList: nodeList
    });
};

exports.create = async (req, res) => {
    const token = req.header('Authorization');
    const { content, desc, fatherId } = req.body;
    const user = await checkToken(token);
    if (!user) {
        res.statusCode = 401;
        res.send({
            code: 300000,
            msg: '登录信息过期'
        });
        return;
    }
    if (!content || !desc || !fatherId) {
        res.send({
            code: 200000,
            msg: '参数为空'
        });
        return;
    }
    if (content.length > 999) {
        res.send({
            code: 200012,
            msg: "内容字数不符合要求"
        });
        return;
    }
    if (desc.length > 50) {
        res.send({
            code: 200013,
            msg: "描述字数不符合要求"
        });
    }
    let hash = sha256(sha256(content));
    let uid = user[0]._id;
    let nodeOpt = {
        type: 'insert',
        table: 'nodes',
        query: {
            content: content,
            desc: desc,
            author_id: uid,
            hash: hash,
            father_id: fatherId,
            child_nodes: false
        }
    };
    let nodeCreate = await db(nodeOpt);
    if (nodeCreate.errmsg !== undefined) {
        res.send({
            code: 200011,
            msg: '内容重复'
        });
        return;
    }
    let _str = nodeCreate.ops[0]._id.toString().substr(0, 8);
    let timestamp = new Date(Number(parseInt(_str, 16).toString() + '000'));
    res.send({
        code: 100000,
        nodeId: nodeCreate.ops[0]._id,
        fatherId: fatherId,
        content: content,
        desc: desc,
        timestamp: timestamp,
        authorId: uid,
        childNodes: false
    });
};