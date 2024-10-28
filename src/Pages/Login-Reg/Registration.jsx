import { useContext, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/UseAxios";
import UseUsers from "../../Hooks/UseUsers";
const Registration = () => {

  const [errorMessage, setErrorMessage] = useState('');

  const { createUser, handleGoogleSignIn } = useContext(AuthContext);
 
  const axiosPublic = useAxios();

  const {allUser} = UseUsers();

  const navigate = useNavigate();

  const handleRegister = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const displayName = form.get("name")
    const email = form.get("email")
    const password = form.get("password")
    setErrorMessage('')
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
    if (password.length < 6) {
      setErrorMessage('Your Password Should Contain at least 6 characters')
      return;
    }

    // else if (allUser.find(user=> user.email == email))
    // {
    //   setErrorMessage('Email Already Exist')
    // }
    // else if (!/[A-Z]/.test(password)) {
    //   setErrorMessage('Your Password Should Contain at least 1 one uppercase letter')
    //   return;
    // }

    // else if (!/[!@#$%^&*]/.test(password)) {
    //   setErrorMessage('Your Password Should Contain at least 1 one special character')
    //   return;
    // }

    createUser(email, password)
      .then((res) => {
        const loggedUser = res.user;
        const userInfo = {
          userID: loggedUser.uid,
          email: loggedUser.email,
          displayName: displayName,
          role: "student",
          photoURL: loggedUser.photoURL || "https://i.ibb.co/QDfSLpn/7309681.jpg",
          phone: "",
          address: "",
          username: loggedUser.email,
          password: password,
          Enrolled : [],
          live_enroll:[],
        };
        // const userInfo = {email,displayName, role, photoURL ,phone, address, username,  password}
        axiosPublic.post('/all-users', userInfo)
          .then(res => {
            if (res.data.insertedId) {
              console.log('user added to the database')
              toast.success('SignIn Successful')
              navigate('/');
            }
          })

      })
      .catch((error) => {
        toast.error(error.message.slice(10));
        setErrorMessage(error.message);
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
                axiosPublic.post('http://82.112.227.89:5000/all-users', userInfo)
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
    <div className="hero min-h-screen py-20  rounded-lg  bg-main">
      <div className="hero-content flex flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white"><span className="text-prime">Register</span> now!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
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
            {
                errorMessage ?
                  <div className="my-3 ">
                    <p className="text-red text-sm">{errorMessage}</p>
                  </div>
                  :
                  <div></div>
              }
            <div className="form-control mt-6">
              <button className="btn mb-2 bg-prime text-white">Register</button>
              <button  onClick={() => handleSocialLogin(handleGoogleSignIn)} className="btn bg-prime text-white">Register With Google</button>
              <p className="mt-5 text-xs">Already have an account???<span className="text-prime font-semibold"><Link to='/login'>Login Now!</Link></span></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;