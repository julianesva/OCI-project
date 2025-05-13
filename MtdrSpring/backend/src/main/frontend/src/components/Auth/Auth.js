import './Auth.css';
import { useState, useEffect } from 'react';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [isSignIn, setIsSignIn] = useState(true);
    const { isSignedIn, user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn && user) {
            const role = user.publicMetadata?.role;
            if (role === 'admin') {
                navigate('/displays/dashboard', { replace: true });
            } else {
                navigate('/displays/dashboard', { replace: true });
            }
        }
    }, [isSignedIn, user, navigate]);

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