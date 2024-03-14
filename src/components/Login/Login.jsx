import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [errorMessage,setErrorMessage]=useState('');
    const [errorForgetPassword,setErrorForgetPassword]= useState('');
    const emailRef=useRef(null);

    const handelLogin=e=>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        setErrorMessage('');
        signInWithEmailAndPassword(auth,email,password)
        .then(userCredential=>{
            const user= userCredential.user;
            console.log(user);
        })
        .catch(error=>{
            console.log(error);
            setErrorMessage(error);
        })   
    }

    const handelForgetPassword=()=>{
        const email = emailRef.current.value;
        setErrorForgetPassword('');
        if(!email){
            setErrorForgetPassword('please-write you email.');
            return;
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setErrorForgetPassword('Please Enter a valid email');
        }

        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('Please, check your Email.')
        })
        .catch((error)=>{
            console.log(error);
        })
    } 


    return (
        <div>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.</p>
                        </div>
                        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handelLogin} className="card-body">
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                             <label className="label">
                                <a onClick={handelForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            </div>
                            <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                         <p>If You Do not have account please <Link to="/register">Click here</Link> </p>
                        {
                            errorMessage && <p className="text-red-600">Invalid Email and Password!</p>
                        }
                        {
                            errorForgetPassword&& <p>{errorForgetPassword}</p>
                        }
                        </div>
                       
                    </div>
                </div>  
        </div>
    );
};

export default Login;