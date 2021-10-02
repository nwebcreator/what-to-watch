import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const mainProps = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseYear: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App title={mainProps.title} genre={mainProps.genre} releaseYear={mainProps.releaseYear} />
  </React.StrictMode>,
  document.getElementById('root'));
