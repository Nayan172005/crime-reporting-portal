import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock user database (in a real app, this would be an API call to your backend)
  const usernames = ['user1', 'user2', 'admin'];
  const passwords = ['password1', 'password2', 'admin123'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (loginError) setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Find the user index
      const userIndex = usernames.indexOf(formData.username);
      
      // Check if user exists and password matches
      if (userIndex === -1 || passwords[userIndex] !== formData.password) {
        setLoginError('Invalid username or password');
        setIsSubmitting(false);
        return;
      }
      
      // Successful login
      console.log('Login successful for:', formData.username);
      setIsSubmitting(false);
      
      // Store login state (in a real app, you might use context or redux)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', formData.username);
      
      // Redirect to home page
      navigate('/report');
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h2>Sign In to Your Account</h2>
          
          {loginError && <div className="login-error">{loginError}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username" 
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password" 
                  className={errors.password ? 'error' : ''}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="/forgot-password">Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              className={`login-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
            
            <div className="social-login">
              <p>Or sign in with:</p>
              <div className="social-icons">
                <button type="button" className="social-btn google">
                  <FaGoogle /> Google
                </button>
                <button type="button" className="social-btn facebook">
                  <FaFacebook /> Facebook
                </button>
                <button type="button" className="social-btn twitter">
                  <FaTwitter /> Twitter
                </button>
              </div>
            </div>
          </form>
          
          <div className="signup-option">
            <p>Don't have an account? <a href="/register">Create an account</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;