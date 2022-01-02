const load = require('loadtest');

// load.loadTest({ 
//     url: 'http://localhost:3030/activity-groups',
//     maxRequests: 1000,
//     concurrency: 1,
//     method: 'POST',
//     contentType: 'applicaton/json',
//     body: {
//        email: 'email@email.com',
//        title: 'title' 
//     }
// }, (err, res) => {
//     console.log(err)

//     console.log('POST')

//     console.log(res)
// });

load.loadTest({ 
    url: 'http://localhost:3030/activity-groups',
    maxRequests: 1000,
    concurrency: 10,
    method: 'GET',
    contentType: 'applicaton/json'
}, (err, res) => {
    console.log(err)

    console.log('GET')

    console.log(res)
});