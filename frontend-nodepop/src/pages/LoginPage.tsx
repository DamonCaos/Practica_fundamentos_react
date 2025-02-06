import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password,
            }); 

            const token = response.data.token;
            if (remember) {
                localStorage.setItem("authTioken", token);
            } else {
                sessionStorage.setItem("authToken", token);

            }

            navigate('/adverts');
        } catch (error) {
            setError('Incorret Credentials');
            
        }
    }

    return (
        <div>
            <h2>Login Now</h2>
            <form onSubmit={ handleLogin }>
                <input 
                type="email"
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                 />
                <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                    />
                <label>
                    Remember me
                    <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                    />
                </label>
                <button type="submit">Login</button>


            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
}

export default LoginPage;