import Main from '../main/main';

type AppProps = {
  title: string,
  genre: string,
  releaseYear: number
}

function App({ title, genre, releaseYear }: AppProps): JSX.Element {
  return <Main title={title} genre={genre} releaseYear={releaseYear} />;
}

export default App;
