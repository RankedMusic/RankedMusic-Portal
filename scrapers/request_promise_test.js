require('request-promise')({
    url: 'https://ipinfo.io/json',
    proxy: 'http://cazocdva:otx45dcea6qk@45.136.228.154:6209',
    rejectUnauthorized: false,
    })
.then(function(data){ console.log(data); },
    function(err){ console.error(err); });