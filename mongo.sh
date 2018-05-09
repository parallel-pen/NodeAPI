#!/bin/bash
mongodb='mongo mongodb://localhost:27017'

$mongodb <<EOF

use parallel
db.createCollection("users", {
    autoIndexId: true
})
db.users.createIndex( {"account": 1}, {unique: true} )
db.users.createIndex( {"username": 1}, {unique: true} )

exit;
EOF