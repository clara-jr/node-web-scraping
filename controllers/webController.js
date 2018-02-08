var request = require('request');
var cheerio = require('cheerio');

exports.index = function(req, res) {
    res.render('index', {title: "Welcome"});
};

exports.list = function (req, res, next) {
  request.get(
    {url:'http://localhost:8080/webs'},
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('get failed:', err);
      }
      console.log('Get successful! Server responded with:', body);
      res.render('webs/index', {webs: body});
    }
  );
};

exports.findById = function (req, res, next) {
  request.get(
    {url:'http://localhost:8080/webs/'+req.params.webId},
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('get failed:', err);
      }
      console.log('Get successful! Server responded with:', body);
      body = JSON.parse(body);
      var url = body.url;
      request(url, function(error, response, html){
          if(!error){
              var $ = cheerio.load(html);
              var title, text;
              var json = {title : "", text : ""};
              var filters = body.filters;
              for (f in filters) {
                if (filters[f].type == "Title") {
                  $(filters[f].pattern).filter(function(){
                      var data = $(this);
                      title = data.text();
                      json.title = title;
                  });
                } else if (filters[f].type == "Body") {
                    $(filters[f].pattern).filter(function(){
                      var data = $(this);
                      text = data.text();
                      json.text = text;
                  });
                }
              }
              res.render('webs/show', {web: json});
          }
      });
    }
  );
};