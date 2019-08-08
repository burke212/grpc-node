// requirements
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const util = require('util');

// gRPC client
const productProtoPath = path.join(__dirname, '..', '..', 'protos', 'product.proto');
const productProtoDefinition = protoLoader.loadSync(productProtoPath);
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product;
const client = new productPackageDefinition.ProductService(
  'localhost:50051', grpc.credentials.createInsecure());

const Promise = require('bluebird');

// handlers
// const listProducts = (req, res) => {
//   console.log("> Hit: grpcRoutes.js listProducts");
//     /*
//   gRPC method for reference:
//   listProducts(Empty) returns (ProductList)
//   */
//   // res.json(callClientListProducts());
//   debugger;
//   client.listProducts({}, (err, result) => {//MAKE THIS SYNCHRONOUS
//     console.log("Result: \t", result);                // Print 'result' in as-is format. 
//     console.log("typeof result: \t", typeof result);  // Print type of 'result'.
//     // console.log(res.json(result));                 // Print 'result' in JSON format.
//     res.json(result);                                 // Send/return 'result' in JSON format.
//     // res.json({ name: "jessie" });                  // TEST; Send/return {name: "jessie"}.
//     console.log(result);
//     console.log("*******************");
//   });

//   console.log("> end of grpcRoutes.js listProducts");
// };

// let callListProducts = util.promisify(client.listProducts);
// let listProducts = callListProducts().then(console.log('Promisfy Worked'), console.error);

const listProducts = function(req, res) {
  Promise.try(() => {
    console.log("lol2");
    let sql = 'SELECT NAME as name FROM PEEPS';
    return client.listProducts(sql); //"client.listProducts;" returns [object Object]. "client.listProducts()" & "client.listProducts(req, res)" return "Error: Argument mismatch in makeUnaryRequest"
  }).then((result) => {
    console.log("lol3"+res.json(result));
    res.json(result);
  }).catch(console.error);
}

// async function callClientListProducts(){
//   let promise = new Promise((resolve, reject) => {
//     client.listProducts({}, (err, result) => {
//       console.log("New test results: ", result);
//       debugger;
//       return result;
//     });
//     setTimeout(() => resolve("RESOLVED"), 1000);
//   });
  
//   let result = await promise;

//   return result;
// }

const readProduct = (req, res) => {};
const createProduct = (req, res) => {};
const updateProduct = (req, res) => {};
const deleteProduct = (req, res) => {};

module.exports = {
  listProducts,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
