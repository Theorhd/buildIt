import React, { useState } from 'react';
import logo from '../../../public/buildit-logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de soumission du formulaire
        console.log('Email:', email);
        console.log('Password:', password);
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
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className='w-full h-10 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary'
                            placeholder='a@a.com'
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
                            placeholder='********'
                        />
                    </div>
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
