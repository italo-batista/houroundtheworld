import React, { Component } from 'react';

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD9ghoDb2sS7KWSNMHve53qQ7qkjCa-8Pc'
  });


class MyLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.getUserAdress = this.getUserAdress.bind(this);
    }
    
    getCurrentLocation(callback) {        
        if (navigator.geolocation) {            
            navigator.geolocation.getCurrentPosition(function(position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    var currLocation = lat + ", " + lng;
                    callback(currLocation);
            });
        }
    }
    
    getUserAdress() {
        this.getCurrentLocation(function(location) {  
            
            googleMapsClient.reverseGeocode({
                latlng: location,
                result_type: ["locality", "political"],
                location_type: ['APPROXIMATE']
            }, function (err, response) {
                if (!err) {
                    let address = response.json.results[0].formatted_address; 
                    this.setState({
                        address: address
                    })
                }
            }.bind(this));
        }.bind(this))
    }

    componentDidMount() {
        this.getUserAdress();
    }

    render() {
        return (
            <div>
                {this.state && this.state.address &&
                    <div>{this.state.address}</div>
                }
            </div>                                            
        );
    }
}

export default MyLocation;