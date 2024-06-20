// src/pages/AuthCallback.js
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../pages/AuthContext';
import { createSession } from '../auth/auth';

function AuthCallback() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get('request_token');
    const approved = urlParams.get('approved');

    if (approved === 'true' && requestToken) {
      createSession(requestToken)
        .then(() => {
          setIsAuthenticated(true);
          navigate('/favorites'); // Redirect to favorites after creating session
        })
        .catch(error => {
          console.error('Failed to create session:', error);
          navigate('/signin');
        });
    } else {
      navigate('/signin');
    }
  }, [navigate, setIsAuthenticated]);

  return <div>Processing authentication...</div>;
}

export default AuthCallback;
