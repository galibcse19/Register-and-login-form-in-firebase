import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

 

const Registation = () => {

    const [registerError,setRegisterError]=useState('');
    const [registerSuccess,setRegisterSuccess]=useState('');
    const [showPassword,setShowPassword]=useState(false);

    const handelRegister=e=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email,password);
        if(password.length < 6){
            setRegisterError('Password Must Be 6 Character or More.');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError("Password Must Contained One Upper Case");
            return;
        }
        else if(accepted == false){
            setRegisterError('Accept terms and conditions.')
            return;
        }

        setRegisterError('');
        setRegisterSuccess('');

        createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                if(userCredential.user.emailVerified){
                    setRegisterSuccess('User Created Successfully');
                }
                else{
                    alert("Email not Verified");
                }

                sendEmailVerification(userCredential.user)
                .then(()=>{
                    alert("Please check Your email.");
                })
            })
            .catch((error) => {
                 console.log(error);
                 setRegisterError(error.message);
            });
    }
    return (
        <div className="">
              <div className="hero min-h-screen bg-base-200">
                    <div className="">
                        <div className="text-center lg:text-left ">
                        <h1 className="text-5xl font-bold mb-10">Register Now...</h1>
                        </div>
                        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handelRegister} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <div className="border"><input  type="email" placeholder="email" name="email" className="input" required /></div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="relative border">
                                        <input type={showPassword ? "text" : "password"} placeholder="password" name="password" className="input input-bordered" required />
                                        <span className="absolute text-xl mt-4 right-5" onClick={()=>setShowPassword(!showPassword)}>
                                            {
                                                showPassword ? <IoMdEyeOff /> : <IoEye />
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input className="mr-2" type="checkbox" name="terms" id="terms" />
                                    <label className="" htmlFor="terms">Accept our <a href="#">terms and conditions.</a></label>
                                </div>
                                <div className="form-control mt-4">
                                    <input className="btn btn-active btn-secondary" type="submit" value="REGISTER" />
                                </div>
                            </form>
                            <p>If You have an account please <Link to="/login">Click Here</Link></p>
                            {
                                registerError && <p className="text-xl text-red-600">{registerError}</p>
                            }
                            {
                                registerSuccess && <p className="text-xl text-blue-700">{registerSuccess}</p>
                            }
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Registation;