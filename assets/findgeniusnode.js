const db = require('./dbaction');

module.exports = async () => {
    let nodeOpt = {
        type: "find",
        table: "nodes",
        query: {
            first: true
        }
    };
    let findGeniusNode = await db(nodeOpt);
    return findGeniusNode
}