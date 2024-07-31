import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SignUp.css'; // Import the CSS for styling
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import LoadingSpinner from '../components/Loading'; // Import the spinner component

const SignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://syoft.dev/Api/user_registeration/api/user_registeration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_firstname: firstname,
          user_email: email,
          user_phone: phone,
          user_password: password,
          user_lastname: 'Doe', // Static data
          user_city: 'Hyderabad', // Static data
          user_zipcode: '500072' // Static data
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === true) {
        // Redirect to Login page
        navigate('/login');
      } else {
        throw new Error(data.msg || 'Sign up failed');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up">
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <FormInput
          type="text"
          name="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="First Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <FormInput
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
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
        <FormButton text="Sign Up" type="submit" label="Sign Up" />
        <div className="login-link">
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
