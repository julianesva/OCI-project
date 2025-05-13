import './Auth.css';
import { SignIn } from "@clerk/clerk-react";

export default function Auth() {
    return (
        <div className='auth-main-container'>
            <SignIn path="/" routing="path" signUpUrl="/sign-up" />
        </div>
    )
}