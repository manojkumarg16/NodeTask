var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Crawler = require("node-webcrawler");
var arr = [];

router.get('/readContent', function(req, res) {
    fs.readFile("testfile.txt", function(err, value) {
        if(err) {
            res.end(err);
        }
        res.end(value.toString());
    }); 
  });

router.get('/product/:v1/:v2', function(req, res) {
  var value1 = req.params.v1;
  var value2 = req.params.v2;
  
  if(isNaN(value1) || isNaN(value2)){
    res.status(400);
    res.end("Bad Request");
    }
    else{
        res.end((value1*value2).toString());
    }
});


router.get('/writeContent/:inputvalue', function(req, res) {
    var fileContent = req.params.inputvalue;
    fs.writeFile("testfile.txt", fileContent, function(err) {
        if(err) {
            res.end(err);
        }
        res.end("Success");
    }); 
  });

  router.get('/string/:inputString', function(req, res) {
    var stringValue = req.params.inputString;
    if(stringValue == ''){
        res.sendStatus(404);
        res.end();
    }
    else{
        for (var i = 0; i < stringValue.length; i++) {
            var c = stringValue.charAt(i);
            if (stringValue.indexOf(c) == i && stringValue.indexOf(c, i + 1) == -1) {
                res.end(c);
            }
        }
    }
  });

  router.get('/crawler',function(req,res) {
    var url = 'https://www.wipro.com/';
    request(url, function(err, resp, body){
        if(!err){
            $ = cheerio.load(body);
            links = $('a');
            $(links).each(function(i, link){
                if($(link).attr('href') && $(link).attr('href').startsWith('http'))
                    arr.push($(link).attr('href'));
            });
            res.send(JSON.stringify(arr));
        }
        else{
            res.send(err)
        }
    });
  })




module.exports = router;
