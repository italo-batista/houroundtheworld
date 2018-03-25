import React, { Component } from 'react';

export class MyCurrentTime extends Component {
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

export class LocalityCurrentTime extends Component {
  constructor(props) {
    super(props);
    var targetDate = new Date()
    var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60
    var localdate = new Date(timestamp * 1000 + this.props.offsets)
    this.state = { 
      hours: localdate.getHours(),
      minutes: localdate.getMinutes(),
      seconds: localdate.getSeconds() 
     };
  }

  tick() {
    var targetDate = new Date()
    var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60
    var localdate = new Date(timestamp * 1000 + this.props.offsets)
    this.setState({ 
      hours: localdate.getHours(),
      minutes: localdate.getMinutes(),
      seconds: localdate.getSeconds() 
     });
  }

  componentDidMount() {
    this.update = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.update);
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
