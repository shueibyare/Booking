import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const LoginForm = ({ onLogin }) => {
    const [form, setForm] = useState({ username: '', password: '' })
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.post('http://localhost:8000/api/login/', form)
            setMessage('Login Success')
            if (onLogin) {
                onLogin(response.data.token, response.data.user_id)
            }
            navigate("/")
        } catch (error) {
            setMessage("Login Failed: " + (error.response?.data?.message || 'Invalid credentials'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Sign in to your account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                required
                                value={form.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        {message && (
                            <div className={`alert ${message.includes('Success') ? 'alert-success' : 'alert-danger'}`} role="alert">
                                {message}
                            </div>
                        )}

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Signing in...
                                    </>
                                ) : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
