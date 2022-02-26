var request = require("request");
const fs = require('fs');
auth = require('./ApiKey.json');
var method = 'ocr/image/toText';
//var method = 'html_conversion?version=2018-10-15';
//var method = 'tables?version=2018-10-15';
var transUrl = 'https://api.cloudmersive.com/' + method;
transUrl =     'https://api.cloudmersive.com/ocr/image/toText';
request.post(
    {             
        url: transUrl,        
        headers:{        
        auth,
        //"Apikey":"MiApikey",
        content_type: 'application/json'
},
form : {
    //"imageFile" : fs.createReadStream('./DynamicFileHandler.axd.pdf')
    "imageFile" : fs.createReadStream('./Mensaje.png')
    //"imageFile" : 'C:/Users/Jesus/Documents/Proyecto js/CloudMersiveOcr/Mensaje.png'
}
      }          
, function (err, response, body) {
    console.log(response.statusCode);
    fs.writeFileSync('./Result.json',response.body);
});