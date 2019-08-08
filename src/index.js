console.log("started");

// var app = require('../client/app');
var myNameElem = document.querySelector(".myName");
var btn = document.getElementById('clickMeBTN');


btn.addEventListener('click', function(e) {
    console.log("button was clicked");
    
    fetch('http://127.0.0.1:3000/api/products', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        console.log("Response: ", response);
        return;
      }
      throw new Error('Request failed. index fetch');
    })
    .catch(function(error) {
      console.log(error);
    });
}); 
