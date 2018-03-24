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