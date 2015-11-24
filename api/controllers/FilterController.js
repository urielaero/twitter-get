/**
 * FilterController
 *
 * @description :: Server-side logic for managing filters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Twitter = require('twitter'),
  moment = require('moment');
  client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key:  process.env.TOKEN_KEY,
    access_token_secret: process.env.TOKEN_SECRET
});

module.exports = {
  get: function(req, res){
    var hashtag = req.param('hashtag', ''),
        from = moment(req.param('from', moment().subtract(1, 'days'))),
        to = moment(req.param('to', moment()));

    from = from.startOf('day');
    to = to.endOf('day');

    get(hashtag, function(err, tweet){
      console.log(err);
      if(err) return res.json({err: err[0].message});
      var locations = tweet.statuses.map(function(tw){
        var obj = {
          text: tw.text,
          location: tw.user.location,
          created_at: moment(new Date(tw.created_at).toISOString())
        }
        return obj;
      });

      locations = locations.filter(function(tw){
        return tw.location && tw.created_at >= from && tw.created_at <= to;
      });

      var filter = [],
      filterIndex = [];

      locations.forEach(function(e){
        var index = filterIndex.indexOf(e.location);
        e.created = e.created_at.format('DD/MM/YYYY');
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
  client.get('search/tweets', {q: query, count: 200, result_type: 'mixed'},  function(error, tweet, response){
    done(error, tweet);
  });
}

