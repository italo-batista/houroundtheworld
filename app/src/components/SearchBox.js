import React, { Component } from 'react';
import Search from 'react-search-box';

import './../style/Search.css';


class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: false, items: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    fetch('https://api.github.com/search/repositories?q=topic:ruby+topic:rails')
    .then(res => res.json())
    .then(data => {
      this.setState({
        data: data.items,
        loading: false,
        item: []
      });
    })
  }

  handleChange(searchedValue) {
    const newItem = {
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
                  data={ this.state.data }
                  onChange={ this.handleChange }
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
        <ul>
          {this.props.items.map(
            item => (
              <li key={item.id}>{item.text}</li>
            )
          )}
        </ul>
      );
    }
  }

export default SearchBox;