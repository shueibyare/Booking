import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '', email: '', password: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:8000/api/register/', form);
      setMessage('Registration successful! You can now login.');
      setForm({ username: '', email: '', password: '' });
    } catch (error) {
      setMessage("Registration failed: " + (error.response?.data?.username || error.response?.data?.email || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card shadow p-4 rounded-4 w-100" style={{ maxWidth: '480px' }}>
      <h2 className="text-center mb-4 fw-bold text-dark">Create a new account</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-semibold">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="form-control"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-semibold">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="form-control"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {message && (
          <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}

        <div className="d-grid">
          <button
            type="submit"
            className="btn text-white"
            style={{ backgroundColor: '#4F46E5' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Registering...
              </>
            ) : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
