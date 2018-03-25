import React, { Component } from 'react';

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD9ghoDb2sS7KWSNMHve53qQ7qkjCa-8Pc'
});

class Timezone extends Component {

    componentDidMount() {        
        googleMapsClient.reverseGeocode({
            latlng: [-7.248130, -35.902184],
            result_type: ["locality", "political"],
            location_type: ['APPROXIMATE']
        }, function (err, response) {
            if (!err) {
                console.log(response.json.results);
            }
        });
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}


// http://www.javascriptkit.com/dhtmltutors/local-time-google-time-zone-api.shtml

