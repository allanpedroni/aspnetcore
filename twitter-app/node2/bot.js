var Twit = require('twit')
var jsonfile = require('jsonfile')
var config = require('./config');
//var tt = require('fs');

var file = '/aspnetcore/twitter-app/db/data.json'

var T = new Twit(config);


    // T.get('account/verify_credentials', { skip_status: true })
    // .catch(function (err) {
    //     console.log('caught error', err.stack)
    // })
    // .then(function (result) {
    //     // `result` is an Object with keys "data" and "resp". 
    //     // `data` and `resp` are the same objects as the ones passed 
    //     // to the callback. 
    //     // See https://github.com/ttezel/twit#tgetpath-params-callback 
    //     // for details. 

    //     //console.log('data', result.data);
    //     console.log('twitter is working fine!');
    // })

    // var params = {
    //     q: 'AllanPedroni',
    //     count: 1
    // };
    
    // T.get('search/tweets', params, gotData);

    // function gotData(err, data, response)
    // {
    //     data.statuses.forEach(e => {
    //         console.log(e.text);
    //     });
    // }

    //setInterval(tweetIt, 1000*5);

    function tweetIt()
    {
        var r = Math.floor(Math.random()*100);

        var tweet = {
            status: 'hello world from node.js!' + r
        }

        T.post('statuses/update', tweet , tweeted);

        function tweeted(err, data, response) {
            if (err)
                console.log('algo deu errado:' + err);
            else
                console.log('deu certo');
        }
    }

    var s = T.stream('statuses/filter', {track: 'manga'})

    s.on('tweet', tweet)

    function tweet(e){
        console.log(e.text + ' - ' + e.user.screen_name);
        
        //var name = e.source.name;
        //var sn = e.source.screen_name;
        //console.log(sn);
        jsonfile.writeFileSync(file, e, {flag: 'a'});
    }
    
    //var obj = {name: 'JP'}
    
    

    // jsonfile.writeFile(file, obj, function (err) {
    //   console.error(err)
    // })

    // T.post('statuses/destroy/:id', { id: '961007634605363201' }, function (err, data, response) {
    //     console.log(data)
    // })

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
