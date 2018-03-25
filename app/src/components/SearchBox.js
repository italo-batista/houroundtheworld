import React, { Component } from 'react';
import Search from 'react-search-box';
import {LocalityCurrentTime} from './CurrentTime';
import './../style/Search.css';

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD9ghoDb2sS7KWSNMHve53qQ7qkjCa-8Pc'
});


class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.cities, items: [] };
    this.handleChange = this.handleChange.bind(this);
    this.getCurrentDateTime = this.getCurrentDateTime.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
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
        this.addNewItem(searchedValue, offsets)       
      }
    }.bind(this)); 
  }

  addNewItem(searchedValue, offsets) {
    const newItem = {
      id: Date.now(),
      offsets: offsets,    
      text: searchedValue  
    };
    const items = this.state.items.slice();
    this.setState({
      items: items.concat(newItem)
    });
  }

  render() {
    return (
      <div>
        <SimpleList items={this.state.items} />
        <div className="search__component">
          <Search
            data={this.state.data}
            onChange={this.handleChange}
            placeholder="Search for a string..."
            class="search-class"
            searchKey="name"
          />
        </div>
      </div>
    );
  }
}

function SimpleList(props) {
    return (
      <div>
        {props.items.map(
          item => (
              <div className="row" key={item.id}>
                {item.text}
                <LocalityCurrentTime 
                  offsets={item.offsets}/> 
              </div>                 
          )
        )}
      </div>
    );
}
export default SearchBox;
