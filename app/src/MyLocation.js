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
                    console.log(results); //["locality", "political"]
                    let address = results[3].formatted_address; 
                    this.setState({
                        address: address
                    })
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

export default MyLocation;