'use strict';
const mongodb = require("mongodb").MongoClient;

/* 
    type: 数据库操作, (find, updateOne, delete, insertOne)
    table: collection名,
    query: 查询条件,
    data: 插入数据,
    sort: 排序法
*/

module.exports = async (opt) => {
    if(!opt.table){
        return;
    }

    return new Promise((resolve, reject) => {
        let oprateData = (db, callback) => {  
            let collection = db.collection(opt.table);
            //插入数据
            let { data, query, sort, type } = opt;
            if(type == 'find'){
                collection.find(query||{}).sort(sort||{}).toArray((err, result) => { 
                    if(err){
                        console.log('Error:'+ err);
                        reject(err);
                        return;
                    }
                    callback(result);
                });
            }else if(type == 'updateOne'){
                collection[type](query, data, (err, result) => { 
                    if(err){
                        console.log('Error:'+ err);
                        reject(err);
                        return;
                    }
                    callback(result);
                });
            }else{
                collection[type](query, (err, result) => { 
                    if(err){
                        console.log('Error:'+ err);
                        reject(err);
                        return;
                    }
                    callback(result);
                });
            }
        }
        mongodb.connect('mongodb://localhost:27017/', (err, client) => {
            // console.log("连接成功！");
            oprateData(client.db('parallel'), (result) => {
                resolve(result);
                client.close();
            });
        });
    }).catch((error) => {
        return error;
    });
}

