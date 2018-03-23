import React, { Component } from 'react';

const google = window.google;
let geocoder = new google.maps.Geocoder();

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
                    var currLocation = new google.maps.LatLng(parseFloat(lat), parseFloat(lng))
                    callback(currLocation);
            });
        }
    }
    
    getUserAdress() {
        this.getCurrentLocation(function(location) {  
            geocoder.geocode({ 'latLng': location}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                        if (arrayHasItem(results[i].types, "locality") &&
                            arrayHasItem(results[i].types, "political")) {
                            let address = results[i].formatted_address; 
                            this.setState({
                                address: address
                            })
                            break;
                        }
                    }
                }
            }.bind(this))              
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

function arrayHasItem(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === item) {
            return true;
        }
    }
}

export default MyLocation;