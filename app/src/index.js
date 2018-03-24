import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import registerServiceWorker from './service/registerWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

