import React from 'react'
import {Form,Input,message} from 'antd';
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

const LoginPage = () => {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const submitHandler=async(values)=>{
        try {
           setLoading(true);
           const {data}= await axios.post('/users/login',values);
           setLoading(false);
           localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
           message.success('Logged in successfully');
            navigate('/');
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong. Try again later')
        }
    }

    //preventing login page when logged in
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/');
        }
    },[navigate]);

  return (
    <>
        <div className='register-page'>
            {
                loading && (
                    <Spinner/>
                )
            }

            <Form layout='vertical' onFinish={submitHandler}>
                <h1>Login Page</h1>
                <Form.Item label='Email' name='email'>
                    <Input type='email' />
                </Form.Item>
                <Form.Item label='Password' name='password'>
                    <Input type='password' />
                </Form.Item>
                <div className='d-flex flex-column'>
                    <Link to='/register'>Not a user? Click here to register</Link>
                    <button className='btn btn-primary'>Login</button>
                </div>
            </Form>
        </div>
    </>
  )
}

export default LoginPage