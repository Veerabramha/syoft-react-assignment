import React, { useState } from 'react';
import './Login.css'; // Import the CSS for styling
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import LoadingSpinner from '../components/Loading'; // Import the spinner component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://syoft.dev/Api/userlogin/api/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email: email, user_password: password }),
      });

      const data = await response.json();

      if (response.ok && data.status === true) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user_data));

        // Redirect to Dashboard page
        window.location.href = '/dashboard';
      } else {
        throw new Error(data.msg || 'Login failed');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p className="error">{error}</p>}
        <FormButton text="Sign In" type="submit" label="Log In" />
      </form>
    </div>
  );
};

export default Login;
