import React from 'react';
import { Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import history from './History';

import './App.css';

import Posts from './components/Posts';
import PostForm from './components/PostForm';

function App() {
  return (
    <Provider store={store}>
        <Router history={history}>
          <div className="App">
              <Route path='/postForm/:id' component={PostForm} />
              <Route exact path='/' render= {props => (
                  <React.Fragment>
                      <Posts />
                  </React.Fragment>
              )} />
            <hr />
          </div>
        </Router>
    </Provider>
  );
}

export default App;
