import React, { Component } from 'react';
import {MyCurrentTime} from './CurrentTime';
import MyLocation from './MyLocation';
import SearchBox from './SearchBox'

import './../style/App.css';
import cities from 'cities.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Timezone App</h1>
        </header>
        <div className="row">
          <div className="col-md-4">                     
            Your current time is <MyCurrentTime />
            <MyLocation />
            <SearchBox 
              cities={cities}
            />
          </div>
          <div className="col-md-4">
            <SearchBox 
              cities={cities}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
