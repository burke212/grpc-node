// requirements
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

const fs = require('fs');
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const sqlite3 = require('sqlite3').verbose();
const util = require('util');

// grpc service definition
const productProtoPath = path.join(__dirname, '..', 'protos', 'product.proto');
const productProtoDefinition = protoLoader.loadSync(productProtoPath);
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product;

const Promise = require('bluebird');
/*
Using an older version of gRPC?
(1) You won't need the @grpc/proto-loader package
(2) const productPackageDefinition = grpc.load(productProtoPath).product;
*/


// const listProducts = function(req, res) {  
//   console.log("server lol");
//   Promise.try(() => {
//     return callListProducts();
//   }).then((result) => {
//     console.log("result success");
//     res.json(result);
//   }).catch(console.error);
// }

const listProducts = function(sql){
  console.log("This bette work...");
  return new Promise(function(resolve, reject){
    // let sql = 'SELECT NAME as name FROM PEEPS';
      
      var db = new sqlite3.Database('../data/testDB.db', sqlite3.OPEN_READONLY, (err) => {
        if(err){
          console.error(err.message);
        }
        console.log("connected to DB");
      });

      db.get(sql, (err, row) => {
        if(err){
          console.error(err.message);
          return reject(err);
        }
        console.log(row);
        return resolve(row);
      });

      // callback(null, data);//BAD - CHANGE TO PROMISE

      db.close((err) => {
        if(err) {
          console.error(err.message);
        }
        console.log('closed db');
      });
  });
}

// function callListProducts(){
//   return new Promise.try(
//     function(resolve, reject){
//       let sql = 'SELECT NAME as name FROM PEEPS';
      
//       var db = new sqlite3.Database('../data/testDB.db', sqlite3.OPEN_READONLY, (err) => {
//         if(err){
//           console.error(err.message);
//         }
//         console.log("connected to DB");
//       });

//       db.get(sql, (err, row) => {
//         if(err){
//           console.error(err.message);
//           return reject(err);
//         }
//         console.log(row);
//         return resolve(row);
//       });

//       // callback(null, data);//BAD - CHANGE TO PROMISE

//       db.close((err) => {
//         if(err) {
//           console.error(err.message);
//         }
//         console.log('closed db');
//       });
//     }
//   );
// }



// getDataFromDatabase = (db, sql) => {
//   db.get(sql, (err, row) => {
//     if(err){
//       console.error(err.message);
//     }
//     return row;
//   });

// }

// closeDB = (db) => {
//   db.close((err) => {
//     if(err) {
//       console.error(err.message);
//     }
//     console.log('closed db');
//   });
  
// }

// const listProducts = (result, callback) => {
//   console.log("******** Listed the products *********");
//   var data = {};

//   var db = new sqlite3.Database('../data/testDB.db', sqlite3.OPEN_READONLY, (err) => {
//     if(err){
//       console.error(err.message);
//     }
//     console.log("connected to DB");
//   });

//   // db.serialize(() => {
//   //   (async () => {
//   //     let dat = await getDbInfo(db);

//   //     console.log("pre-callback: ", dat);
//   //     callback(null, { products:  dat });
//   //     console.log("post-callback: ", dat);
//   //   });
//   // });
//   let sql = 'SELECT NAME as name FROM PEEPS';

  
//       //let testData = { products: row.name };
  
//       //console.log(testData);
//       //console.log("pre-callback: ", testData);

//       data = getDataFromDatabase(db, sql);
//       callback(null, data);
//       closeDB(db);
//       //console.log("post-callback: ", testData);
//       //console.log("typeof testData: ", typeof testData);
//       // data.name = row.name;
//       // return row.name;


//   //let sql = 'SELECT NAME as name FROM PEEPS';

// //  db.get(getStmt, function(err, row) {
// //
// //    let testData = { products: row.name };
// //    console.log(testData);
// //    
// //        db.run(getStmt, function (err) {
// //            callback(err, testData);
// //        });
// //});


// //
// //
// //
// //db.getAsync = function (sql) {
// //  var that = this;
// //  return new Promise(function (resolve, reject) {
// //      that.get(sql, function (err, row) {
// //          if (err)
// //              reject(err);
// //          else
// //              resolve(row);
// //      });
// //  });
// //};
// //
// //db.getAsync(sql).then((result) => {
// //  console.log(result);
// //  //callback(null, result);
// //}).catch((err) => {
// //  //fix me pls
// //});
// //
// //  

  
// }

// function getDbInfo(db){
//   console.log("hit: getDbInfo()");

  
// }


function readProduct(call, callback) {}
function createProduct(call, callback) {}
function updateProduct(call, callback) {}
function deleteProduct(call, callback) {}

// main
function main() {
  const server = new grpc.Server();
  // gRPC service
  server.addService(productPackageDefinition.ProductService.service, {
    listProducts: listProducts,
    readProduct: readProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
  });
  // gRPC server
  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('gRPC server running at http://127.0.0.1:50051');
}

main();
