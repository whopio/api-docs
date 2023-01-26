import { useEffect } from 'react';
import Router from 'next/router';

const NotFound = () => {
  useEffect(() => {
    Router.push('/');
  }, []);

  return null;
};

export default NotFound;