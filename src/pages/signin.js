// src/pages/SignIn.js
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../pages/AuthContext';
import { getRequestToken } from '../auth/auth';

function SignIn() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      setIsAuthenticated(true);
      navigate('/favorites'); // Redirect to favorites if session ID exists
    } else {
      getRequestToken()
        .then(token => {
          const redirectUrl = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/authenticate/callback`;
          window.location.href = redirectUrl;
        })
        .catch(error => {
          console.error('Failed to get request token:', error);
        });
    }
  }, [navigate, setIsAuthenticated]);

  return <div>Redirecting to TMDb for authentication...</div>;
}

export default SignIn;
