import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/configue';

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const submitForm = (e)=>{
    e.preventDefault();
    const formValues = {
        email,
        password
    }
  const errors = validateForm(formValues);
  if (Object.keys(errors).length !== 0) {
    setErrors(errors);
  }
  else{
   signIn()
  }
}

const signIn = async ()=>{
    try{
      const userCredentials = await signInWithEmailAndPassword(auth,email,password);
      setEmail('');
      setPassword('');

      if(userCredentials.user.email){
        navigate('/timer',{
          state :{
            email:userCredentials.user.email
          }
        });
      }
    }catch{
        console.log('error')
        setError('Invalid email or Password');
    }
}

    const validateForm = (formValues)=>{
        const errors = {};

        if (!formValues.email.trim()) {
            errors.email = "Email Address is required";
          } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = "Email Address is not valid";
          }
        if (!formValues.password.trim()) {
            errors.password = "Password is required";
        }
        return errors
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-[#77C3FD] via-[#6D7CFD] to-[#B3AAFC]'>
    <div className='w-full md:w-1/2 lg:w-1/3 p-6 md:p-10 rounded-md bg-white flex flex-col justify-center gap-4 shadow-md'>
     <div className=''>
         <h1 className='text-center text-blue-700 text-3xl font-sans font-extrabold'>Pomodro Login</h1>
         <h1 className='text-gray-600 text-center lg:whitespace-nowrap'>a Pomodro timer app</h1>
     </div>
      <label htmlFor="email">Email</label>
      <input type='email' className='p-2 border rounded-md' placeholder='abc@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      {errors.email && <p className='text-red-500'>{errors.email}</p>}
      <label htmlFor="password">Password</label>
      <input type='password' className='p-2 border rounded-md' placeholder='******' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
      {errors.password && <p className='text-red-500'>{errors.password}</p>}
      <button className='p-2 rounded-md bg-blue-500 text-white font-bold' onClick={submitForm}>Login</button>
      {error && <p className='text-red-500'>{error}</p>}
      <p className='text-gray-400'>Dont have Account <Link to={'/signup'} className='text-blue-500 underline'>Click..?</Link></p>
    </div>
 </div>
  )
}

export default Login
