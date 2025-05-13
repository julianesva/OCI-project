import './Auth.css';
import { useState, useEffect } from 'react';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [isSignIn, setIsSignIn] = useState(true);
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate('/displays/dashboard', { replace: true });
        }
    }, [isSignedIn, navigate]);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath == '/signup') {
            setIsSignIn(false);
        } else {
            setIsSignIn(true);
        }
    })

    return (
        <div className='auth-main-container'>
            {isSignIn
                ? <SignIn signUpUrl='/signup' />
                : <SignUp signInUrl='/' />
            }
        </div>
    );
}