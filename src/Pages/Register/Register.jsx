import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import registerAnimation from '../../assets/lottie/register.json'
import { AuthContext } from '../../Provider/AuthProvider';
const Register = () => {
    const {createUser} = useContext(AuthContext)
    const handleRegister = e=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email,password)
        createUser(email,password)
        .then(result=>{
            // console.log(result.user)
        })
        .catch(err=>{
            // console.log(err.code)
        })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie animationData={registerAnimation}></Lottie>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleRegister}>
                    <h1 className="text-5xl font-bold">Register now!</h1>
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Email</label>
                            <input type="email" className="input" name='email' placeholder="Email" />
                            <label className="fieldset-label" >Password</label>
                            <input type="password" className="input" name='password' placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4" >Register</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;