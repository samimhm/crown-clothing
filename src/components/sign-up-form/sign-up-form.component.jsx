import { useState } from 'react';
import { creatAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer } from './sign-up-form.styles.jsx'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [ formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields
    

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(password !== confirmPassword) {
            alert('passwords do not match')
            return
        }

        try{
            const { user } = await creatAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields()
        }
        catch(err) {
            if(err.code === 'auth/email-already-in-use'){
                alert('Cannot create user. Email already in use.')
            }
            console.log('Error at handleSubmit signUpForm: ', err)
        }
    }

    const handleChange = (event) => {
     const { name, value } = event.target
     setFormFields({...formFields, [name]: value})
    }

    return (
        <SignUpContainer>
            <h2 style={{margin: `10px 0`}}>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type="text" required onChange={handleChange} name='displayName' value={displayName}/>

                <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email}/>

                <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password}/>

                <FormInput  label='Confirm Password' type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <Button type="submit">{'Sign Up'}</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm