import { Link } from "react-router-dom";



const Login = () => {
    return (
        <div className="hero min-h-screen  bg-main">
        <div className="hero-content flex flex-col ">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold text-white"><span className="text-prime">Login</span> now!</h1>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form  className="card-body">
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
                    <div className="form-control mt-6">
                        <button className="btn mb-2 bg-prime text-white" >Login</button>
                        <button className="btn bg-prime text-white">Login With Google</button>
                        
                        <p className="mt-5 text-xs">Do not Have an account???<span className="text-prime"><Link to='/register'>Register Now!</Link></span></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Login;