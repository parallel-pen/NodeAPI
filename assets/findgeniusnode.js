const db = require('./dbaction');

module.exports = async () => {
  const nodeOpt = {
    type: 'find',
    table: 'nodes',
    query: {
      first: true
    }
  };
  let findGeniusNode = await db(nodeOpt);
  return findGeniusNode;
};
