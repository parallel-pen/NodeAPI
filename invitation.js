const db = require('./assets/dbaction');

for (var i = 10; i < 60; i++) {
  let invitation = `pptest${i}`;
  const dbOpt = {
    type: "insertOne",
    table: "invitations",
    query: {
      code: invitation,
      available: true
    }
  };
  db(dbOpt).catch(err => {console.log(err)});
}