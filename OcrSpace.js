var request = require("request");
var fs = require('fs');
//remove local file
auth = require('./ApiKeyOCRSpace.json');
Bitmap = require('./BitmapValue.json');
var transUrl = 'https://api.ocr.space/parse/image';
var file = fs.readFileSync('./Mensaje.png');
//var file = fs.readFileSync('./DynamicFileHandler.axd.pdf');
//convert to base64 file content
var base64data = new Buffer(file).toString('base64');
var base64data = Bitmap.Bitmap;
var formImage = 'form :{"base64Image":data:image/bmp;base64,' + base64data + '}'
//convert clipboard content to base64
//var base64data = new Buffer(clipboardy.readFileSync()).toString('base64');
//Create form
var formImage = {
    'base64Image': 'data:image/bmp;base64,' + base64data};
request.post(
    {             
        url: transUrl,        
        headers:{        
       // "apikey":auth.apikey,
       "apikey":'helloworld',
        content_type: 'application/json'
},
form : {
    "base64Image" : 'data:image/bmp;base64,' + base64data
}
}
, function (err, response, body) {
    console.log(response.statusCode);
    // find in response ParsedText element in ParsedResults element
    var parsedText = JSON.parse(body).ParsedResults[0].ParsedText;
    if (parsedText) {
        console.log(parsedText);
        return;
    }
    var time = new Date().getTime().toString();
    fs.writeFileSync('./Result'+ time + '.json',response.body);
});