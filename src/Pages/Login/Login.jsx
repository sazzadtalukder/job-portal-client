import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import registerAnimation from '../../assets/lottie/register.json'
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const location = useLocation();
    // console.log('in login page',location.state)
    const navigate = useNavigate();
    const from = location.state || '/';
    const { logIn } = useContext(AuthContext)
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)
        logIn(email, password)
            .then(result => {
                // console.log(result.user)
                // const user ={email: email}
                // axios.post('https://job-portal-server-again.vercel.app/jwt',user,{withCredentials: true})
                // .then(res=>{
                //     console.log(res.data)
                // })
                navigate(from)
            })
            .catch(err => {
                // console.log(err.code)
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie animationData={registerAnimation}></Lottie>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleLogin}>
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Email</label>
                            <input type="email" className="input" name='email' placeholder="Email" />
                            <label className="fieldset-label" >Password</label>
                            <input type="password" className="input" name='password' placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4" >Login</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;