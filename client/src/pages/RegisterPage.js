import React, { useEffect, useState } from 'react'
import {Form,Input,message} from 'antd';
import axios from 'axios';
import Spinner from './Spinner';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate=useNavigate();
    const [loading,setLoading]= useState(false);
    const submitHandler=async(values)=>{
        try {
            setLoading(true);
            await axios.post('/users/register',values);
            setLoading(false);
            message.success('Registration successful');
            navigate('/login')
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong. Try again later');
        }
    }

    //preventing register page when logged in
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
                <h1>Register Page</h1>
                <Form.Item label='Name' name='name'>
                    <Input />
                </Form.Item>
                <Form.Item label='Email' name='email'>
                    <Input type='email' />
                </Form.Item>
                <Form.Item label='Password' name='password'>
                    <Input type='password' />
                </Form.Item>
                <div className='d-flex flex-column'>
                    <Link to='/login'>Already registered? Click here to login</Link>
                    <button className='btn btn-primary'>Register</button>
                </div>
            </Form>
        </div>
    </>
  )
}

export default RegisterPage