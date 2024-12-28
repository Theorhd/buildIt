import React, { useState } from 'react';
import logo from '../../../public/buildit-logo.png';
import {login} from '../../utils/api_router';

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Appel de la route API login
            const data = await login(mail, password);
            /* Mise a jour des tokens dans le local storage */
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('pseudo', data.pseudo);
            localStorage.setItem('mail', data.mail);

            /* Redirection page principale */
            if (localStorage.getItem('access') !== undefined) {
                console.log("Login success");
                window.location.href = '/';
            } else {
                console.error("Access token is undefined or not save in local storage");
            }
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <div className="logo flex items-center justify-center bg-bgPrimary p-5">
                <img src={logo} alt="BuildIT Logo" className="w-12 h-12 object-contain" />
                <h2 className='font-bold text-2xl ml-2 text-center'>BUILD<span className='text-secondary'>IT</span></h2>
            </div>
            <div className='main-div flex flex-col items-center justify-center bg-bgPrimary w-screen'> 
            <h1 className='font-thin mb-10'>Login</h1>
            <div className='flex flex-col items-center justify-center'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col justify-center w-full'>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={mail} 
                            onChange={(e) => setMail(e.target.value)} 
                            required 
                            className='w-full h-10 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary'
                        />
                    </div>
                    <div className='flex flex-col justify-center mt-5 w-full'>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className='w-full h-10 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary'
                        />
                    </div>
                    {error && 
                    <div className='flex justify-center text-center mt-5 mb-5'>
                        <p className=' text-red-500 text-sm w-52'>{error}</p>
                    </div>
                    }
                    
                    <div className='flex justify-center mt-5'>
                        <button type="submit" className='w-1/2 border-none rounded-full bg-secondary hover:scale-105 hover:shadow-lg hover:shadow-slate-700 transition-all'>Submit</button>
                    </div>
                </form>
                <div>
                    <p className='mt-5'>Don't have an account? <a href='/register' className='text-secondary'>Register</a></p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;
