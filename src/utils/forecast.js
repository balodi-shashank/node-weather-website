const request = require('request');

const forecast = (lati, longi, callback) => {
    const url = 'https://api.darksky.net/forecast/b04c2996ea87a526dddb54bc3867f93c/' + lati + ',' + longi

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.daily.data[0].temperatureMin + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    })
}

module.exports = forecast;