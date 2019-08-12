// requirements
const express = require('express');
const grpcRoutes = require('./grpcRoutes');

// new router
const router = express.Router();

const Promise = require('bluebird');

// routes
router.get('/products', function(req, res){
    Promise.try(function() {
        console.log("lol");
        return grpcRoutes.listProducts(req, res);
    }).then(function(result){
        console.log(result);
        result;
    }).catch(console.error);
});
router.get('/products/:id', grpcRoutes.readProduct);
router.post('/products', grpcRoutes.createProduct);
router.put('/products/:id', grpcRoutes.updateProduct);
router.delete('/products/:id', grpcRoutes.deleteProduct);

module.exports = router;
