import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import './SignUp.css'

const SignUp = () => {
    const [error, setError] = useState(null);
    const { createUser } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm)

        if (password.length < 6) {
            setError('Password should be six characters or more.')
            return;
        }

        if (password !== confirm) {
            setError('Your password did not match');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset();
            })
            .catch(error => {
                console.error(error)
            })


    }

    return (
        <div className='container'>
            <div className="form-container">
                <h1 id='heading'>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input type="password" name="confirm" required />
                    </div>
                    <input className='submit-btn' type="submit" value="Login" />
                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
                <p className='text-error'>{error}</p>
            </div>
        </div>
    );
};

export default SignUp;