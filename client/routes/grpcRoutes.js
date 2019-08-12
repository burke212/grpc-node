// requirements
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const util = require('util');
const caller = require('grpc-caller');

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
  const payload = { name:  client.productName };
  console.log("somehting");
  //HOT FRESHNESS WAY
  // Promise.try(() => {
  //   console.log("lol2");
  //   return client.listProducts( (err, result) => {
  //     console.log("lol3"+result);
  //     res.json(result);
  //   }); //"client.listProducts;" returns [object Object]. "client.listProducts()" & "client.listProducts(req, res)" return "Error: Argument mismatch in makeUnaryRequest"
  // }).catch(console.error);

  // OLD & BUSTED WAY
  client.listProducts({}, (err, result) => {
    console.log(result);
    res.json(result);
  });
}

// ).then((result) => {
//   console.log("lol3"+res.json(result));
//   res.json(result);
// }

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
