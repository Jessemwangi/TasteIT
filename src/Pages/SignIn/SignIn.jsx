import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'
import { UserAuth } from '../../DataLayer/Context/Context';
import GoogleButton from 'react-google-button';

const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();

    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      navigate('/profile/');
    }
  }, [navigate, user]);

  return (
    <div className="signin">
      <h1>Sign in</h1>
      <h4>Please sign in to view your profile:</h4>
      <div className="googleButtonContainer">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default SignIn;