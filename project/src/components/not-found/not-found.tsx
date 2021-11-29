import { Link } from 'react-router-dom';
import './not-found.css';

function NotFound(): JSX.Element {
  return (
    <>
      <Link className="link-return-url" to="/">Return to main</Link>
      <div className="flex-center position-r full-height">
        <div className="code">404</div>
        <div className="message" style={{ padding: '10px' }}>NOT FOUND</div>
      </div>
    </>
  );
}

export default NotFound;
