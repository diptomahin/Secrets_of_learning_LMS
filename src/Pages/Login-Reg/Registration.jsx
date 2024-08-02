import { Link } from "react-router-dom";

const Registration = () => {
    return (
        <div className="hero min-h-screen py-20  rounded-lg  bg-main">
        <div className="hero-content flex flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-white"><span className="text-prime">Register</span> now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form  className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo-Url</span>
                </label>
                <input type="text" name="photo" placeholder="photo url" className="input input-bordered" required />
              </div>
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
                <button className="btn bg-prime text-white">Register</button>
              
                <p className="mt-5 text-xs">Already have an account???<span className="text-prime"><Link to='/login'>Login Now!</Link></span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Registration;