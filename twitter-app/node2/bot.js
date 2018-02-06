var Twit = require('twit')

var T = new Twit({
    consumer_key:         'nBjOQb0X19JforIm7NrdwQnJQ',
    consumer_secret:      'XO5PKdrYlo6SUshFD7IdGEbYRV4eLwQGGzzKu1vPpMzHCoXF9U',
    access_token:         '1339082930-nSxFatE5BzuxW5LQipM0rpR0PBSnvcd9rICVmpc',
    access_token_secret:  'ui88Ka6Yk6MY8ZUkfg0UMdw5bYqTaCk7bTl89XueU7Znj'
    //,timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})

// T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
//     console.log(data)
//     });

T.get('account/verify_credentials', { skip_status: true })
    .catch(function (err) {
        console.log('caught error', err.stack)
    })
    .then(function (result) {
        // `result` is an Object with keys "data" and "resp". 
        // `data` and `resp` are the same objects as the ones passed 
        // to the callback. 
        // See https://github.com/ttezel/twit#tgetpath-params-callback 
        // for details. 

        //console.log('data', result.data);
        console.log('twitter is working fine!');
    })

// 
//  filter the twitter public stream by the word 'manga'. 
//
//var stream = T.stream('statuses/filter', { track: 'manga' })

// stream.on('tweet', function (tweet) {
//     console.log(tweet)
// })

// 
// filter the public stream by english tweets containing `#apple` 
// 
//var stream = T.stream('statuses/filter', { track: '#apple', language: 'en' })

// stream.on('tweet', function (tweet) {
//     console.log(tweet)
// })
