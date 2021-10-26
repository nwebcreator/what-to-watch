import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { reducer } from './store/reducer';

const mainProps = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseYear: 2014,
};

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App title={mainProps.title} genre={mainProps.genre} releaseYear={mainProps.releaseYear} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
