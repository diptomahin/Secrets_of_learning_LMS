import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { PropTypes } from 'prop-types';
import { GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/firebase.config';
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

 const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] =useState(null)
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        toast.success('SignIn Successful')
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    const handleGoogleSignIn = () =>{
        signInWithPopup(auth, provider)
        .then(result => {
            toast.success('Login Successful')
            const user = result.user;
            console.log(user)
        })
        .catch(error => {
            console.log(error.massage)
        })
    }

    const logOut = () => {
        setLoading(true);
        toast.success('Logout Successful')
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Auth state changed', currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        handleGoogleSignIn,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes ={
    children:PropTypes.object,
}

export default AuthProvider;