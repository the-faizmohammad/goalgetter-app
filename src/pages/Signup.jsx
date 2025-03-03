import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '@slices/authSlice';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import "../styles/auth.css";

const SignupPage = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signup(userData));

    if (signup.fulfilled.match(result)) {
      setSuccessMessage(result.payload);
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <InputField type="text" name="name" placeholder="Full Name" value={userData.name} onChange={handleChange} />
        <InputField type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} />
        <InputField type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} />
        <Button text={loading ? "Signing up..." : "Sign Up"} type="submit" disabled={loading} />
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
