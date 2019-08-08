// requirements
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
var cors = require('cors');

// express
const app = express();

app.use(cors({
  origin: 'http://localhost:8080'
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// function getName(){
  // routes
  app.use('/api', productRoutes);
  debugger;
// }

// app.get('/api', (req, res) => {
  // console.log("app.get hit");
  // res.then(productRoutes)
  // .catch(function(error) {
  //   console.log(error);
  //   console.log("app.get error");
  // });
  // productRoutes
  // res.sendStatus(201);
// });

// run server
app.listen(3000, () => {
  console.log('Server listing on port 3000');
});

// module.exports = function () {
//   app.use('/api', productRoutes);
// };