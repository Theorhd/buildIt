import React from 'react';
import logo from '../../../public/buildit-logo.png';
import './Register.css';

const Register: React.FC = () => {
	return (
        <div>
            <div className="logo flex items-center justify-center bg-bgPrimary p-5">
                <img src={logo} alt="BuildIT Logo" className="w-12 h-12 object-contain" />
                <h2 className='font-bold text-2xl ml-2 text-center'>BUILD<span className='text-secondary'>IT</span></h2>
            </div>
            <div className='main-div flex flex-col items-center justify-center bg-bgPrimary w-screen'> 
			<h1 className='font-thin mb-10'>Create an account</h1>
			<div className="registerForm flex">
                <form action="" className="flex flex-col">
                    <div className='flex mt-2 mb-2'>
                        <div className='flex flex-col w-1/2'>
                            <label>First Name</label>
                            <input type="text" placeholder='Frist Name' className='w-full h-10 p-4 rounded-md cursor-auto shadow-md shadow-bgSecondary' />
                        </div>
                        <div className='flex flex-col w-1/2 ml-5'>
                            <label>Last Name</label>
                            <input type="text" placeholder='Last Name' className='w-full h-10 p-4 rounded-md cursor-auto shadow-md shadow-bgSecondary'  />
                        </div>
                    </div>
                    <div className='flex mb-2'>
                        <div className='flex flex-col w-1/2'>
                            <label>Username</label>
                            <input type="text" placeholder="Username" className='w-full h-10 p-4 rounded-md cursor-auto shadow-md shadow-bgSecondary' />
                        </div>
                        <div className='flex flex-col w-1/2 ml-5'>
                            <label>Phone Number</label>
                            <input type="text" placeholder="Phone Number" className='w-full h-10 p-4 rounded-md cursor-auto shadow-md shadow-bgSecondary' />
                        </div>
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label>Email</label>
                        <input type="email" placeholder="Email" className='w-full h-10 p-4 rounded-md cursor-auto shadow-md shadow-bgSecondary' />
                    </div>
                    <div className='flex mb-2'>
                        <div className='flex flex-col w-1/2'>
                            <label>Password</label>
                            <input type="password" placeholder="Password" className='w-full h-10 p-4 rounded-md cursor-auto shadow-md shadow-bgSecondary' />
                        </div>
                        <div className='flex flex-col w-1/2 ml-5'>
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Confirm Password" className='w-full h-10 p-4 rounded-md cursor-auto shadow-md shadow-bgSecondary' />
                        </div>
                    </div>
                    <div className='flex flex-col mt-5 items-center justify-center'>
                        <button className='w-1/2 border-none hover:bg-secondary hover:shadow-lg hover:shadow-slate-700 transition-all'>Submit</button>
                    </div>
                </form>
            </div>
		</div>

        </div>
	);
};

export default Register;
