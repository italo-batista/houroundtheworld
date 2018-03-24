import React, { Component } from 'react';

class CurrentTime extends Component {
    constructor(props) {
      super(props);
      const now = new Date();
      this.state = { 
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds() 
      };
    }
  
    tick() {
      const now = new Date();    
      this.setState({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds() 
      });
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    render() {
      return (
        <div>
          {this.state.hours}:
          {this.state.minutes}:
          {this.state.seconds}
        </div>
      );
    }
  }

export default CurrentTime;

// https://maps.googleapis.com/maps/api/geocode/json?latlng=-7.257033,%20-35.920525&key=AIzaSyD9ghoDb2sS7KWSNMHve53qQ7qkjCa-8Pc