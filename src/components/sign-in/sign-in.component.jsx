import React, { useState } from 'react';
import { connect } from 'react-redux';
import './sign-in.styles.scss';

// Components
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.compnent';

// Redux actions
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userDetails, setUserDetails] = useState({ email: '', password: '' });

    const { email, password } = userDetails;

    const handleChange = e => {
        const { value, name } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        emailSignInStart(email, password);
    };

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput type='email' name='email' value={email} handleChange={handleChange} label='Email' required />
                <FormInput type='password' name='password' value={password} handleChange={handleChange} label='Password' required />
                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
                        Sign In With Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);
