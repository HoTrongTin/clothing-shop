import React from 'react';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './sign-up.style.scss'

class SignUp extends React.Component{
    constructor(){
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword } = this.state;
        if(password !== confirmPassword){
            alert('Password dont match');
            return;
        }

        try{
            //createUserWithEmailAndPassword(...,...) method của auth, dùng để tạo authenticated user trong firebase, nhưng chưa được lưu thông tin trong firebase database
            //Phải turn on chế dộ Email/Password trong Sign-in method trong mục Authentication của Firebase
            //sign in ngay khi tạo xong user
            const { user } = await auth.createUserWithEmailAndPassword(email, password)

            //tạo hồ sơ người dùng trong firebase database
            await createUserProfileDocument(user, { displayName })

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }catch(err){
            console.error(err)
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({[name]: value})
    }

    render(){
        const {displayName, email, password, confirmPassword } = this.state;

        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput type='text' 
                                name='displayName' 
                                value={displayName}
                                onChange={this.handleChange}
                                label='Display Name'
                                require
                    />
                    <FormInput type='email' 
                                name='email' 
                                value={email}
                                onChange={this.handleChange}
                                label='Email'
                                require
                    />
                    <FormInput type='password' 
                                name='password' 
                                value={password}
                                onChange={this.handleChange}
                                label='Password'
                                require
                    />
                    <FormInput type='password' 
                                name='confirmPassword' 
                                value={confirmPassword}
                                onChange={this.handleChange}
                                label='Confirm Password'
                                require
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;

