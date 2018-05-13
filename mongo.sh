#!/bin/bash
mongodb='mongo mongodb://localhost:27017'

$mongodb <<EOF

use parallel
# 字段：lastchoice 上次选择的节点
db.createCollection("users", {
    autoIndexId: true
})
db.users.createIndex( {"account": 1}, {unique: true} )

db.createCollection("invitations", {
    autoIndexId: true
})
db.invitations.createIndex( {"code": 1}, {unique: true} )

db.createCollection("nodes", {
    autoIndexId: true
})
db.nodes.createIndex( {"hash": 1}, {unique: true})

exit;
EOF