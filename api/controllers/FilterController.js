/**
 * FilterController
 *
 * @description :: Server-side logic for managing filters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key:  process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET
});

module.exports = {
  get: function(req, res){

    get('#lol', function(err, tweet){
      if(err) return res.json(err);
      var locations = tweet.statuses.map(function(tw){
        var obj = {
          text: tw.text,
          location: tw.user.location,
          created_at: tw.created_at
        }
        return obj;
      });

      locations = locations.filter(function(tw){
        return tw.location;
      });

      var filter = [],
      filterIndex = [];

      locations.forEach(function(e){
        var index = filterIndex.indexOf(e.location);
        if(index == -1){
          filterIndex.push(e.location);
          filter.push({location: e.location, tweets: [e]});
        }else{
          filter[index].tweets.push(e);

        }
      });


      res.json(filter);
    });
  }
};

function get(query, done){
  client.get('search/tweets', {q: query, count: 200},  function(error, tweet, response){
    done(error, tweet);
  });
}

