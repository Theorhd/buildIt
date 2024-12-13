import React from 'react';

const Register: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center p-10 bg-bgPrimary h-screen'>
			<h1 className='font-thin'>Register</h1>
			<div className="registerForm flex">
                <form action="" className="flex flex-col mt-5">
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
                        <button className='w-1/2 border-none hover:bg-secondary hover:shadow-lg hover:shadow-slate-700 transition-all'>Register</button>
                    </div>
                </form>
            </div>
		</div>
	);
};

export default Register;
