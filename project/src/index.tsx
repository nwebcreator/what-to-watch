import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { films } from './mocks/films';

const mainProps = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseYear: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App title={mainProps.title} genre={mainProps.genre} releaseYear={mainProps.releaseYear} films={films} />
  </React.StrictMode>,
  document.getElementById('root'));
