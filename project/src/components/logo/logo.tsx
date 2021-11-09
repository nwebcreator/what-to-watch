import { memo } from 'react';
import { Link } from 'react-router-dom';

type LogoProps = {
  isCenter?: boolean;
}

function Logo({ isCenter }: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link to="/" className={`logo__link${isCenter ? ' logo__link--light' : ''}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default memo(Logo);
