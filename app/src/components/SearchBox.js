import React, { Component } from 'react';
import Search from 'react-search-box';

import './../style/Search.css';

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD9ghoDb2sS7KWSNMHve53qQ7qkjCa-8Pc'
});


class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: false, items: [] };
    this.handleChange = this.handleChange.bind(this);
    this.getCurrentDateTime = this.getCurrentDateTime.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    // fetch('https://api.github.com/search/repositories?q=topic:ruby+topic:rails')
    // .then(res => res.json())
    // .then(data => {
    //   this.setState({
    //     data: data.items,
    //     loading: false,
    //     item: []
    //   });
    // })

    var cg = { 'id': 0, 'full_name': 'Campina Grande' };
    var tr = { 'id': 1, 'full_name': 'Toronto' };
    var data = { 0: cg, 1: tr }
    this.setState({
      data: data,
      loading: false,
      item: []
    });
  }

  handleChange(searchedValue) {
    googleMapsClient.geocode({
      address: searchedValue
    }, function (err, response) {
      if (!err) {
        var lat = response.json.results[0].geometry.location.lat;
        var lng = response.json.results[0].geometry.location.lng;
        this.getCurrentDateTime(lat, lng, searchedValue)
      }
    }.bind(this));    
  }

  getCurrentDateTime(lat, lng, searchedValue) {
    var targetDate = new Date()
    var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60
  
    googleMapsClient.timezone({
      location: [lat, lng],
      timestamp: timestamp,
    }, function (err, response) {
      if (!err) {
        var offsets = response.json.dstOffset * 1000 + response.json.rawOffset * 1000
        var localdate = new Date(timestamp * 1000 + offsets)
        var currentTime = localdate.toLocaleString()
        this.addNewItem(currentTime, searchedValue)       
      }
    }.bind(this)); 
  }

  addNewItem(currentTime, searchedValue) {
    const newItem = {
      currentTime: currentTime,
      text: searchedValue,
      id: Date.now()
    };
    const items = this.state.items.slice();
    this.setState({
      items: items.concat(newItem)
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="app__loading">Loading...</div>
      );
    }

    return (
      <div>
        <SimpleList items={this.state.items} />
        <div className="search__component">
          <Search
            data={this.state.data}
            onChange={this.handleChange}
            placeholder="Search for a string..."
            class="search-class"
            searchKey="full_name"
          />
        </div>
      </div>
    );
  }
}

class SimpleList extends Component {

  render() {
    return (
      <div>
        {this.props.items.map(
          item => (
            <li key={item.id}>{item.text} - {item.currentTime}</li>
          )
        )}
      </div>
    );
  }
}

export default SearchBox;