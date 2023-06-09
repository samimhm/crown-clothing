import { useState } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import { ButtonsContainer, SignUpContainer} from './sign-in-form.styles.jsx'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [ formFields, setFormFields] = useState(defaultFormFields)
    const {  email, password } = formFields    

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            await signInAuthUserWithEmailAndPassword(email, password)
            resetFormFields()
        }
        catch(err) {
            switch(err.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email!')
                    break
                case 'auth/user-not-found':
                    alert('No user associated with this email!')
                    break
                default:
                    console.log('Error on sign in: ', err)
            }

            console.log('error: ', err)
        }
    }

    const handleChange = (event) => {
     const { name, value } = event.target
     setFormFields({...formFields, [name]: value})
    }

    return (
        <SignUpContainer>
            <h2 style={{margin: '10px 0'}}>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email}/>
                <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password}/>

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignUpContainer>
    )
}

export default SignInForm