import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/UseAxios";
import UseUsers from "../../Hooks/UseUsers";



const Login = () => {

    const { signIn, handleGoogleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const axiosPublic = useAxios();
    const {allUser, refetchAllUserData, AllUserDataIsLoading, AllUserDataIsPending} = UseUsers();
    console.log(allUser)
    const handleLogin = e => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        setErrorMessage('');
        
        signIn(email, password)
            .then(result => {
                console.log(result.user)
                navigate('/');
            })
            .catch(error => {
                console.log(error.message);
                toast(error.message);
            })

    }

    const handleSocialLogin = () => {
        handleGoogleSignIn()
            .then((res) => {
                const loggedUser = res.user;
                if(allUser.find(user=> user.email == loggedUser.email )){
                    toast.success('Login Successful');
                }
                else{
                    const userInfo = {
                        userID: loggedUser.uid,
                        email: loggedUser.email,
                        displayName: loggedUser.displayName,
                        role: "student",
                        photoURL: loggedUser.photoURL || "",
                        phone: "",
                        address: "",
                        username: loggedUser.email,
                        password: "Logged in with google",
                        Enrolled: [],
                        live_enroll:[],
                    };
                    axiosPublic.post('https://api.ishaan.website/all-users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')
                            toast.success('Login Successful')
                            navigate('/');
                        }
                    })
                    .catch((error) => {
                        console.log(error.message)
                    })

                }        

            })
            .catch((error) => {
                if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                    toast("This email is already in use");
                    return;
                }
                toast(error.message);
            });

    };

    return (
        <div className="hero min-h-screen  bg-main">
            <div className="hero-content flex flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-white"><span className="text-prime">Login</span> now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {
                                errorMessage ?
                                    <div className="my-3 ">
                                        <p className="text-red text-sm">{errorMessage}</p>
                                    </div>
                                    :
                                    <div></div>
                            }
                        <div className="form-control mt-6">
                            <button className="btn mb-2 bg-prime text-white" >Login</button>
                            <button onClick={handleSocialLogin} className="btn bg-prime text-white">Login With Google</button>
                            <p className="mt-5 text-xs">Do not Have an account???<span className="text-prime font-semibold"><Link to='/register'>Register Now!</Link></span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;