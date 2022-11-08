var axios = require('axios')
var qs = require('qs')


var data = qs.stringify({
    'carovy_kod': '3127135',
    'databaze': 'kusovkymagic',
    'nakupzbozi': 'Pridat',
    'kusu': '2'
})
var config = {
    method: 'post',
    url: 'http://cernyrytir.cz/index.php3',
    headers: {
        'Cookie': 'PHPSESSID=0dl6cd2baprqaal9bmfcqrjqn3;',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });