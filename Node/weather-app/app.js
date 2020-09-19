const request = require("request");

// const url = "https://api.darksky.net/forecast/5b356494a91e7d553e9716624d2c9b31/13.0827,42.0876?units=si&lang=en";

// request({ url: url, json: true }, (error, response) => {
//     if(error) {
//             console.log("Unable to connect to weather API..!");
//         } else if(response.body.error){
//                 console.log("Unable to find location..!");
//         } else {
//             const temp = response.body.currently.temperature;
//             const precip = response.body.currently.precipProbability;
//             console.log(response.body.daily.summary + "It is currently " + temp + " degrees out. " + "There is " + precip + "% chance of rain..!");
//         }
// })

const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/chennai.json?access_token=pk.eyJ1IjoiYWpheW1hbmlrYW50YSIsImEiOiJjazB3bnZ2aHIwM3MyM2NvNDI5ajl4eTl4In0.fIL4mQJVCvmlZQxijsSOLQ&limit=1";

request({url: url, json: true}, (error, response) => {
    if(error) {
        console.log("Unable to connect to weather API..!");
    } else if(response.body.features.length == 0){
        console.log("Unable to find location..!");
    } else {
        const coordinates = response.body.features[0].center;
        console.log("The coordinates are " + coordinates);
    } 
})

