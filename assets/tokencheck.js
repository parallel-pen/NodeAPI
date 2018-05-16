const db = require('./dbaction');

module.exports = async (token) => {
    let userOpt = {
        type: "find",
        table: "users",
        query: {
            token: token
        }
    };
    let findUser = await db(userOpt);
    if (token === undefined || !(findUser.length > 0)) {
        return false;
    } else {
        return findUser;
    }
}