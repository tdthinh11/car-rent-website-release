import { Link } from 'react-router-dom';

import Button from '@/components/Button/Button';

const NotFound = () => {
  return (
    <div className="my-5 max-h-screen text-center">
      <h1 className="h2 mb-5">
        404 <br />
        Page Not Found
      </h1>
      <p>Sorry, the page you were looking for does not exist.</p>
      <p className="mb-8">Go To Homepage by Button Below</p>
      <Link to="/">
        <Button variant="primary">Home Page</Button>
      </Link>
    </div>
  );
};

export default NotFound;
